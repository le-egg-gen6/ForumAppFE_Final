import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/shared/component_props"
import type { SimpleUserInfo } from "@/shared/dto/User"

interface UserAvatarProps extends BaseComponentProps {
  user: SimpleUserInfo
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  showOnlineStatus?: boolean
  onClick?: () => void
  ring?: boolean
  ringColor?: string
}

export function UserAvatar({
  user,
  size = "md",
  showOnlineStatus = false,
  onClick,
  ring = false,
  ringColor = "ring-gray-200",
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const onlineStatusSizes = {
    xs: "h-2 w-2",
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-3 w-3",
    xl: "h-4 w-4",
  }

  return (
    <div className="relative">
      <Avatar
        className={cn(
          sizeClasses[size],
          ring && `ring-2 ${ringColor}`,
          onClick && "cursor-pointer hover:opacity-80 transition-opacity",
          className,
        )}
        onClick={onClick}
      >
        <AvatarImage src={user.avatar || undefined} alt={user.username} />
        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {showOnlineStatus && user.online && (
        <div
          className={cn(
            "absolute bottom-0 right-0 bg-green-500 border-2 border-white rounded-full",
            onlineStatusSizes[size],
          )}
        />
      )}
    </div>
  )
}
