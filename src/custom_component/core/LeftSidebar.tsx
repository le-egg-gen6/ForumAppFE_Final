import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { RoomInfo } from "@/shared/dto/RoomChat";
import type { SimpleUserInfo } from "@/shared/dto/User";
import { Bookmark, Calendar, Heart, MessageCircle, Settings, TrendingUp, Users } from "lucide-react";

interface LeftSidebarProps {
  user: SimpleUserInfo;
  chatRooms: RoomInfo[];
  onOpenChat: (roomInfo: RoomInfo) => Promise<void>;
}

const LeftSidebar = ({ user, chatRooms, onOpenChat }: LeftSidebarProps) => {
    const menuItems = [
    { icon: Users, label: "Friends", count: 0, color: "text-blue-500" },
    { icon: Bookmark, label: "Saved", count: 3, color: "text-yellow-500" },
    { icon: Calendar, label: "Events", count: 2, color: "text-purple-500" },
    { icon: TrendingUp, label: "Trending", count: 0, color: "text-green-500" },
    { icon: Heart, label: "Favorites", count: 0, color: "text-red-500" },
    { icon: Settings, label: "Settings", count: 0, color: "text-gray-500" },
  ]

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 group">
          <Avatar className="h-12 w-12 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{user.username}</p>
            <p className="text-sm text-gray-500">View your profile</p>
          </div>
          {user.online && <div className="h-3 w-3 bg-green-500 rounded-full shadow-sm"></div>}
        </div>

        <Separator className="my-4" />

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start h-12 hover:bg-gray-50 transition-all duration-200 group"
            >
              <item.icon className={`mr-3 h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="font-medium">{item.label}</span>
              {item.count > 0 && (
                <Badge className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200" variant="secondary">
                  {item.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Chat Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Your Chats</h3>
            <MessageCircle className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-2">
            {chatRooms.map((room) => {
              const otherParticipant =
                room.type === "private" ? room.participantInfos.find((p) => p.id !== user.id) : null

              return (
                <Button
                  key={room.id}
                  variant="ghost"
                  className="w-full justify-start h-14 p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group"
                  onClick={() => onOpenChat(room)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    {room.type === "private" && otherParticipant ? (
                      <div className="relative">
                        <Avatar className="h-10 w-10 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
                          <AvatarImage src={otherParticipant.avatar || undefined} />
                          <AvatarFallback>{otherParticipant.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {otherParticipant.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                    ) : (
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm truncate">
                        {room.type === "private" && otherParticipant ? otherParticipant.username : room.name}
                      </p>
                      {room.type === "group" ? (
                        <p className="text-xs text-gray-500">{room.participantInfos.length} members</p>
                      ) : (
                        <p className="text-xs text-gray-500">{otherParticipant?.online ? "Active now" : "Offline"}</p>
                      )}
                    </div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
};

export default LeftSidebar;
