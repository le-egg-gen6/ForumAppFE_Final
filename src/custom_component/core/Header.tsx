import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/shared/component_props";
import { formatTimeAgo } from "@/utils/date_utils";
import { useNotificationStore } from "@/zustand/useNotificationStore";
import { Bell, Home, MessageCircle, Search, Settings, User, Users } from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps extends BaseComponentProps {
  appName: string;
}

const Header = ({ appName, className }: HeaderProps) => {
  const { notifications, friendRequests } = useNotificationStore();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigationItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Users, label: "Friends" },
    { icon: MessageCircle, label: "Message" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {appName}
          </h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              className={cn(
                "relative h-10 w-10",
                item.active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 hover:bg-red-50"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <p className="text-sm text-gray-600">
                  You have {notifications.length} new notifications
                </p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={notification.id}>
                      <Button
                        variant="ghost"
                        className="w-full p-4 h-auto justify-start hover:bg-gray-50"
                        onClick={() => onNotificationClick?.(notification)}
                      >
                        <div className="text-left">
                          <p className="text-sm text-gray-900">
                            {notification.content}
                          </p>
                          <p className="text-xs text-blue-600 mt-1 font-medium">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </Button>
                      {index < notifications.length - 1 && <Separator />}
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Friend Requests */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 hover:bg-blue-50"
              >
                <Users className="h-5 w-5" />
                {friendRequests.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                    {friendRequests.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
                <h3 className="font-semibold text-lg">Friend Requests</h3>
                <p className="text-sm text-gray-600">
                  {friendRequests.length} pending requests
                </p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {friendRequests.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No friend requests</p>
                  </div>
                ) : (
                  friendRequests.map((request, index) => (
                    <div key={request.id}>
                      <div className="p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <UserAvatar
                            user={request.sender}
                            size="lg"
                            ring
                            ringColor="ring-blue-100"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {request.sender.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              Wants to be your friend
                            </p>
                            <div className="flex space-x-2 mt-3">
                              <Button
                                size="sm"
                                className="h-8 bg-blue-500 hover:bg-blue-600"
                                onClick={() =>
                                  onFriendRequestAction?.(request.id, "accept")
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                                onClick={() =>
                                  onFriendRequestAction?.(request.id, "decline")
                                }
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < friendRequests.length - 1 && <Separator />}
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <UserAvatar
                  user={user}
                  size="md"
                  showOnlineStatus
                  ring
                  ringColor="ring-gray-200 hover:ring-blue-300"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="p-2">
                <div className="flex items-center space-x-2 p-2">
                  <UserAvatar user={user} size="sm" />
                  <div>
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">View your profile</p>
                  </div>
                </div>
              </div>
              <Separator />
              <DropdownMenuItem onClick={() => onUserMenuAction?.("profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserMenuAction?.("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings & Privacy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserMenuAction?.("help")}>
                Help & Support
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onUserMenuAction?.("logout")}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
