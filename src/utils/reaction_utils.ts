import type { Reaction } from "@/shared/dto/Reaction"

export const getReactionEmoji = (type: string): string => {
  const emojis = {
    like: "👍",
    love: "❤️",
    haha: "😂",
    wow: "😮",
    sad: "😢",
    angry: "😠",
  }
  return emojis[type as keyof typeof emojis] || "👍"
}

export const getTotalReactions = (reactions: Reaction[]): number => {
  return reactions.reduce((sum, reaction) => sum + reaction.count, 0)
}

export const getTopReactions = (reactions: Reaction[], limit = 3): Reaction[] => {
  return reactions.sort((a, b) => b.count - a.count).slice(0, limit)
}
