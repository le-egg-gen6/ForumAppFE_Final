import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { RoomInfo } from "@/shared/dto/RoomChat";
import type { MessageInfo } from "@/shared/dto/RoomMessage";
import { formatTime, formatTimeAgo } from "@/utils/date_utils";
import {
    ImageIcon,
    MoreHorizontal,
    Phone,
    Send,
    Smile,
    ThumbsUp,
    Video,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatPanelProps {
  room: RoomInfo;
  onClose: () => void;
}

export function ChatPanel({ room, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages] = useState<MessageInfo[]>([
    {
      id: 1,
      body: "Hey! How are you doing? 😊",
      type: "text",
      author: room.participantInfos[1],
      reactions: [],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      body: "I'm doing great! Just finished working on a new project. How about you?",
      type: "text",
      author: room.participantInfos[0],
      reactions: [],
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: 3,
      body: "That sounds awesome! I'd love to hear more about it. What kind of project is it?",
      type: "text",
      author: room.participantInfos[1],
      reactions: [{ type: "like", count: 1 }],
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 4,
      body: "It's a web application for managing team projects. Still in development but making good progress! 🚀",
      type: "text",
      author: room.participantInfos[0],
      reactions: [],
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
    },
  ]);

  const otherParticipant =
    room.type === "private"
      ? room.participantInfos.find((p) => p.id !== 1) // Assuming current user ID is 1
      : null;

  useEffect(() => {
    // Simulate typing indicator
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleQuickReaction = () => {
    // Send thumbs up
    console.log("Quick reaction sent");
  };

  return (
    <div className="fixed right-4 bottom-4 w-80 h-[500px] bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center space-x-3">
          {room.type === "private" && otherParticipant ? (
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={otherParticipant.avatar || undefined} />
                <AvatarFallback>
                  {otherParticipant.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {otherParticipant.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
              )}
            </div>
          ) : (
            <div className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-sm font-semibold">
                {room.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-sm">
              {room.type === "private" && otherParticipant
                ? otherParticipant.username
                : room.name}
            </p>
            {room.type === "private" && otherParticipant ? (
              <p className="text-xs text-blue-100">
                {otherParticipant.online
                  ? "Active now"
                  : `Last seen ${formatTimeAgo(new Date())}`}
              </p>
            ) : (
              <p className="text-xs text-blue-100">
                {room.participantInfos.length} members
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20"
          >
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem>Block User</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => {
            const isCurrentUser = msg.author.id === 1; // Assuming current user ID is 1
            const showAvatar =
              index === 0 || messages[index - 1].author.id !== msg.author.id;

            return (
              <div
                key={msg.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end space-x-2 max-w-[75%] ${
                    isCurrentUser ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  {!isCurrentUser && showAvatar && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={msg.author.avatar || undefined} />
                      <AvatarFallback className="text-xs">
                        {msg.author.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {!isCurrentUser && !showAvatar && <div className="w-6" />}

                  <div className="group">
                    <div
                      className={`rounded-2xl px-4 py-2 shadow-sm ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.body}</p>
                    </div>
                    <div
                      className={`flex items-center mt-1 space-x-2 ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <p
                        className={`text-xs text-gray-500 ${
                          isCurrentUser ? "text-right" : "text-left"
                        }`}
                      >
                        {formatTime(msg.createdAt)}
                      </p>
                      {msg.reactions.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <ThumbsUp className="h-2 w-2 text-white fill-current" />
                          </div>
                          <span className="text-xs text-gray-500">
                            {msg.reactions[0].count}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={otherParticipant?.avatar || undefined} />
                  <AvatarFallback className="text-xs">
                    {otherParticipant?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-blue-500"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-20 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500 hover:bg-blue-50"
            onClick={handleQuickReaction}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
