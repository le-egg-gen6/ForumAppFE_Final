import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { CommentInfo } from "@/shared/dto/Comment";
import { formatTimeAgo } from "@/utils/date_utils";
import { MoreHorizontal, Send, Smile } from "lucide-react";
import { useState } from "react";
import ReactionDisplay from "./ReactionDisplay";
import { UserAvatar } from "./UserAvatar";

interface CommentItemProps {
  comment: CommentInfo;
  currentUserId?: number;
  showReplies?: boolean;
  onReply?: (commentId: number, content: string) => void;
  onReaction?: (commentId: number, reactionType: string) => void;
  onEdit?: (commentId: number, newContent: string) => void;
  onDelete?: (commentId: number) => void;
  onReport?: (commentId: number) => void;
  onUserClick?: (userId: number) => void;
  defaultReaction?: string;
}

const CommentItem = ({
  comment,
  currentUserId,
  showReplies,
  onReply,
  onReaction,
  onEdit,
  onDelete,
  onReport,
  onUserClick,
  defaultReaction = "like",
}: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.body);

  const isOwnComment = currentUserId === comment.author.id;

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(comment.id, replyContent);
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  const handleDefaultReaction = () => {
    onReaction?.(comment.id, defaultReaction);
  };

  const handleEdit = () => {
    if (editContent.trim() && editContent !== comment.body) {
      onEdit?.(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const menuItems = [
    ...(isOwnComment && onEdit
      ? [{ label: "Edit", onClick: () => setIsEditing(true) }]
      : []),
    ...(isOwnComment && onDelete
      ? [{ label: "Delete", onClick: () => onDelete(comment.id), danger: true }]
      : []),
    ...(!isOwnComment && onReport
      ? [{ label: "Report", onClick: () => onReport(comment.id), danger: true }]
      : []),
  ];

  return (
    <div className={cn("flex space-x-3 ml-8")}>
      <UserAvatar
        user={comment.author}
        size="sm"
        ring
        ringColor="ring-white"
        onClick={() => onUserClick?.(comment.author.id)}
      />
      <div className="flex-1">
        <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border-none p-0 focus:ring-0"
                autoFocus
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleEdit}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                className="p-0 h-auto font-semibold text-sm text-gray-900 hover:underline"
                onClick={() => onUserClick?.(comment.author.id)}
              >
                {comment.author.username}
              </Button>
              <p className="text-sm text-gray-800 mt-1">{comment.body}</p>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <span>{formatTimeAgo(comment.createdAt)}</span>
          <Button
            variant="ghost"
            size="sm"
            className={"h-6 px-2 text-xs font-semibold transition-colors"}
            onClick={handleDefaultReaction}
          >
            Like
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs font-semibold hover:text-blue-600"
            onClick={() => setShowReplyInput(!showReplyInput)}
          >
            Reply
          </Button>

          {menuItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {menuItems.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={item.onClick}
                    className={item.danger ? "text-red-600" : ""}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ReactionDisplay reactions={comment.reactions} size="sm" />
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="flex space-x-2 mt-3">
            <UserAvatar user={comment.author} size="xs" />
            <div className="flex-1 relative">
              <Input
                placeholder={`Reply to ${comment.author.username}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReply()}
                className="pr-20 rounded-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <Smile className="h-4 w-4 text-gray-400" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                  className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Nested Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                currentUserId={currentUserId}
                showReplies={showReplies}
                onReply={onReply}
                onReaction={onReaction}
                onEdit={onEdit}
                onDelete={onDelete}
                onReport={onReport}
                onUserClick={onUserClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
