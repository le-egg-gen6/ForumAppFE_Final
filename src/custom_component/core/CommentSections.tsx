import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BaseComponentProps } from "@/shared/component_props";
import type { CommentInfo } from "@/shared/dto/Comment";
import { Send, Smile } from "lucide-react";
import { useState } from "react";
import CommentItem from "./CommentItem";
import { UserAvatar } from "./UserAvatar";

interface CommentSectionsProps extends BaseComponentProps {
  comments: CommentInfo[];
  postId: number;
  currentUserId?: number;
  onComment?: (postId: number, comment: string, parentId?: number) => void;
  onReaction?: (commentId: number, reactionType: string) => void;
  onEdit?: (commentId: number, newContent: string) => void;
  onDelete?: (commentId: number) => void;
  onReport?: (commentId: number) => void;
  onUserClick?: (userId: number) => void;
  showReplies?: boolean;
  placeholder?: string;
}

const CommentSection = ({
  comments,
  postId,
  currentUserId,
  onComment,
  onReaction,
  onEdit,
  onDelete,
  onReport,
  onUserClick,
  showReplies = true,
  placeholder = "Write a comment...",
  className,
}: CommentSectionsProps) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment?.(postId, newComment);
      setNewComment("");
    }
  };

  const handleReply = (commentId: number, content: string) => {
    onComment?.(postId, content, commentId);
  };

  return (
    <div className={cn("px-4 py-3 bg-gray-50", className)}>
      {/* Existing Comments */}
      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
            showReplies={showReplies}
            onReply={handleReply}
            onReaction={onReaction}
            onEdit={onEdit}
            onDelete={onDelete}
            onReport={onReport}
            onUserClick={onUserClick}
          />
        ))}
      </div>

      {/* New Comment Input */}
      <div className="flex space-x-3">
        <UserAvatar
          user={{
            id: currentUserId || 0,
            username: "You",
            avatar: null,
            online: true,
          }}
          size="sm"
        />
        <div className="flex-1 relative">
          <Input
            placeholder={placeholder}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
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
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
