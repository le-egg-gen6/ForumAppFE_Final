import { cn } from "@/lib/utils";
import type {
  BaseComponentProps,
  LoadingState,
} from "@/shared/component_props";
import type { PostInfo } from "@/shared/dto/Post";
import { ScaleLoader } from "react-spinners";
import PostCard from "./PostCard";

interface PostFeedProps extends BaseComponentProps, LoadingState {
  posts: PostInfo[];
  currentUserId?: number;
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
  emptyMessage?: string;
  itemSpacing?: string;
}

const PostFeed = ({
  posts,
  currentUserId,
  onReaction,
  onComment,
  onSave,
  onEdit,
  onDelete,
  onReport,
  onUserClick,
  allowReactions = true,
  allowSaving = true,
  showComments = true,
  emptyMessage = "No posts to show",
  itemSpacing = "space-y-6",
  loading = false,
  error = "",
  className,
}: PostFeedProps) => {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <ScaleLoader height={100} margin={6} radius={10} width={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-red-500">Error loading posts: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn(itemSpacing, className)}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          onReaction={onReaction}
          onComment={onComment}
          onSave={onSave}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
          onUserClick={onUserClick}
          allowReactions={allowReactions}
          allowSaving={allowSaving}
          showComments={showComments}
        />
      ))}
    </div>
  );
};

export default PostFeed;
