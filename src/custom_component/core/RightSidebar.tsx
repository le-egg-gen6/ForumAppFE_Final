import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Topic } from "@/shared/dto/Topic";
import type { SimpleUserInfo } from "@/shared/dto/User";
import { Calendar, Gift, TrendingUp, Users } from "lucide-react";

interface RightSidebarProps {
  birthdays: SimpleUserInfo[];
  onlineFriends: SimpleUserInfo[];
  trendingTopics: Topic[];
  onOpenChat: (friend: SimpleUserInfo) => Promise<void>;
}

const RightSidebar = ({
  birthdays,
  onlineFriends,
  trendingTopics,
  onOpenChat,
}: RightSidebarProps) => {
  return (
    <aside className="w-80 space-y-4 sticky top-20 h-fit">
      {/* Birthdays */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Gift className="h-5 w-5 text-pink-500" />
            <span>Birthdays</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {birthdays.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {friend.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{friend.username}</p>
                <p className="text-xs text-gray-500">Today is their birthday</p>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                Wish
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Online Friends */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <span>Online Friends</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {onlineFriends.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              onClick={() => onOpenChat(friend)}
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {friend.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <p className="font-medium text-sm">{friend.username}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <span>Trending</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
            >
              <p className="font-medium text-sm text-blue-600">{topic.tag}</p>
              <p className="text-xs text-gray-500">{topic.count}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Events */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            <span>Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <p className="font-medium text-sm">Tech Meetup 2024</p>
              <p className="text-xs text-gray-600">Tomorrow at 7:00 PM</p>
              <p className="text-xs text-gray-500 mt-1">15 friends are going</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              <p className="font-medium text-sm">Photography Workshop</p>
              <p className="text-xs text-gray-600">This weekend</p>
              <p className="text-xs text-gray-500 mt-1">
                8 friends are interested
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default RightSidebar;