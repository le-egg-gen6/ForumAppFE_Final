import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/shared/component_props";

interface ReactionOption {
  type: string;
  emoji: string;
  label: string;
  color?: string;
}

interface ReactionPickerProps extends BaseComponentProps {
  onReaction: (type: string) => void;
  onClose: () => void;
  reactions?: ReactionOption[];
  size?: "sm" | "md" | "lg";
  direction?: "up" | "down" | "left" | "right";
}

const defaultReactions: ReactionOption[] = [
  { type: "like", emoji: "👍", label: "Like", color: "hover:bg-blue-50" },
  { type: "love", emoji: "❤️", label: "Love", color: "hover:bg-red-50" },
  { type: "haha", emoji: "😂", label: "Haha", color: "hover:bg-yellow-50" },
  { type: "wow", emoji: "😮", label: "Wow", color: "hover:bg-purple-50" },
  { type: "sad", emoji: "😢", label: "Sad", color: "hover:bg-blue-50" },
  { type: "angry", emoji: "😠", label: "Angry", color: "hover:bg-red-50" },
];
const ReactionPicker = ({
  onReaction,
  onClose,
  reactions = defaultReactions,
  size = "md",
  direction = "up",
  className,
}: ReactionPickerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-lg",
    md: "h-12 w-12 text-2xl",
    lg: "h-16 w-16 text-3xl",
  };

  const directionClasses = {
    up: "bottom-full mb-2",
    down: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div
      className={cn(
        "absolute z-50 bg-white rounded-full shadow-xl border p-2 flex space-x-1 animate-in slide-in-from-bottom-2 duration-200",
        directionClasses[direction],
        className
      )}
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      {reactions.map((reaction) => (
        <Button
          key={reaction.type}
          variant="ghost"
          size="sm"
          className={cn(
            "p-0 hover:scale-125 transition-all duration-200",
            sizeClasses[size],
            reaction.color
          )}
          onClick={() => onReaction(reaction.type)}
          title={reaction.label}
        >
          <span>{reaction.emoji}</span>
        </Button>
      ))}
    </div>
  );
};

export default ReactionPicker;