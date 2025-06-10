import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/shared/component_props";
import type { Reaction } from "@/shared/dto/Reaction";
import { getReactionEmoji, getTopReactions, getTotalReactions } from "@/utils/reaction_utils";

interface ReactionDisplayProps extends BaseComponentProps {
  reactions: Reaction[];
  onReactionClick?: (reaction: Reaction) => Promise<void>;
  maxDisplay?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const ReactionDisplay = ({
  reactions,
  onReactionClick,
  maxDisplay = 3,
  size = "md",
  showCount = true,
  className,
}: ReactionDisplayProps) => {
  const totalReactions = getTotalReactions(reactions);
  const topReactions = getTopReactions(reactions, maxDisplay);

  if (totalReactions === 0) return null;

  const sizeClasses = {
    sm: "h-4 w-4 text-xs",
    md: "h-5 w-5 text-sm",
    lg: "h-6 w-6 text-base",
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center space-x-1 p-1 h-auto hover:bg-gray-50",
        className
      )}
      onClick={() => onReactionClick?.(topReactions[0])}
    >
      <div className="flex -space-x-1">
        {topReactions.map((reaction, index) => (
          <div
            key={reaction.type}
            className={cn(
              "bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm",
              sizeClasses[size]
            )}
            style={{ zIndex: maxDisplay - index }}
          >
            {getReactionEmoji(reaction.type)}
          </div>
        ))}
      </div>
      {showCount && (
        <span className="text-sm text-gray-600 font-medium">
          {totalReactions.toLocaleString()}
        </span>
      )}
    </Button>
  );
};

export default ReactionDisplay;
