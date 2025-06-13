import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/shared/component_props";
import type { PostInfo } from "@/shared/dto/Post";
import { formatTimeAgo } from "@/utils/date_utils";
import {
  Download,
  EyeOff,
  FileX,
  MessageCircle,
  MessageSquareWarning,
  MoreHorizontal,
  PencilRuler,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import CommentSection from "./CommentSections";
import ReactionDisplay from "./ReactionDisplay";
import ReactionPicker from "./ReactionPicker";
import { UserAvatar } from "./UserAvatar";

interface PostCardProps extends BaseComponentProps {
  currentUserId?: number;
  post: PostInfo;
  onReaction?: (postId: number, reactionType: string) => void;
  onComment?: (postId: number, comment: string) => void;
  onSave?: (postId: number) => void;
  onEdit?: (postId: number) => void;
  onDelete?: (postId: number) => void;
  onReport?: (postId: number) => void;
  onUserClick?: (userId: number) => void;
  showComments?: boolean;
  allowReactions?: boolean;
  allowSaving?: boolean;
  maxImageHeight?: string;
  defaultReaction?: string;
}

const PostCard = ({
  currentUserId,
  post,
  onReaction,
  onComment,
  onSave,
  onEdit,
  onDelete,
  onReport,
  onUserClick,
  showComments = true,
  allowReactions = true,
  allowSaving = true,
  maxImageHeight = "h-80",
  defaultReaction = "like",
  className,
}: PostCardProps) => {
  const [showCommentsSection, setShowCommentsSection] =
    useState<boolean>(false);
  const [showReactionPicker, setShowReactionPicker] = useState<boolean>(false);

  const isOwnPost = currentUserId === post.author.id;

  const handleUserClick = () => {
    onUserClick?.(post.author.id);
  };

  const handleDefaultReaction = () => {
    onReaction?.(post.id, defaultReaction);
  };

  const menuItems = [
    ...(allowSaving
      ? [
          {
            label: "Save post",
            icon: Download,
            onClick: () => onSave?.(post.id),
          },
        ]
      : []),
    { label: "Hide post", icon: EyeOff, onclick: () => {} },
    ...(isOwnPost && onEdit
      ? [
          {
            label: "Edit post",
            icon: PencilRuler,
            onClick: () => onEdit?.(post.id),
          },
        ]
      : []),
    ...(isOwnPost && onDelete
      ? [
          {
            label: "Delete post",
            icon: FileX,
            onClick: () => onDelete?.(post.id),
            danger: true,
          },
        ]
      : []),
    ...(!isOwnPost
      ? onReport
        ? [
            {
              label: "Report post",
              icon: MessageSquareWarning,
              onClick: () => onReport?.(post.id),
              danger: true,
            },
          ]
        : []
      : []),
  ];

  return (
    <Card
      className={cn(
        "shadow-sm border-gray-200 hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <CardContent className="p-0">
        {/*Post Header*/}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserAvatar
              user={post.author}
              size="md"
              showOnlineStatus
              ring
              ringColor="ring-gray-100"
              onClick={handleUserClick}
            />
            <div>
              <Button
                variant="ghost"
                className="p-0 h-auto font-semibold text-gray-900 hover:underline"
                onClick={handleUserClick}
              >
                {post.author.username}
              </Button>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span>{formatTimeAgo(post.createdAt)}</span>
                <span>•</span>
                <span>🌍</span>
                {post.privacy && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{post.privacy}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {menuItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={item.onClick}
                  className={item.danger ? "text-red-600" : ""}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/*Post Content*/}
        <div className="px-4 pb-3">
          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
          {post.location && (
            <p className="text-sm text-gray-500 mt-2">📍 {post.location}</p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-blue-600 text-sm hover:underline cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Image */}
        {post.images && post.images.length > 0 && (
          <div className="relative">
            <div
              className={`grid gap-1 ${
                post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {post.images.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    className={`w-full ${maxImageHeight} object-cover hover:brightness-95 transition-all duration-200`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reaction Summary */}
        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500">
          <ReactionDisplay reactions={post.reactions} />
          <div className="flex items-center space-x-4">
            {post.comments.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-sm text-gray-500 hover:underline"
                onClick={() => setShowCommentsSection(!showCommentsSection)}
              >
                {post.comments.length} comment
                {post.comments.length !== 1 ? "s" : ""}
              </Button>
            )}
            <span className="hover:underline cursor-pointer">2 shares</span>
          </div>
        </div>

        <Separator />

        {/* Action Button */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            {allowReactions && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    "text-gray-600 hover:bg-blue-50 transition-all duration-200"
                  }
                  onMouseEnter={() => setShowReactionPicker(true)}
                  onMouseLeave={() => setShowReactionPicker(false)}
                  onClick={handleDefaultReaction}
                >
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Like
                </Button>
                {showReactionPicker && (
                  <ReactionPicker
                    onReaction={(type) => {
                      onReaction?.(post.id, type);
                      setShowReactionPicker(false);
                    }}
                    onClose={() => setShowReactionPicker(false)}
                  />
                )}
              </div>
            )}

            {showComments && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                onClick={() => setShowCommentsSection(!showCommentsSection)}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Comment
              </Button>
            )}
          </div>
        </div>

        {/* Comment Section */}
        {showComments && showCommentsSection && (
          <>
            <Separator />
            <CommentSection
              comments={post.comments}
              postId={post.id}
              onComment={onComment}
              currentUserId={currentUserId}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
