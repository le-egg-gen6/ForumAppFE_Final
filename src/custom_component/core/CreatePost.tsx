import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/shared/component_props";
import type { SimpleUserInfo } from "@/shared/dto/User";
import { Gift, ImageIcon, MapPin, Smile, Users, Video, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";

interface CreatePostProps extends BaseComponentProps {
  user: SimpleUserInfo;
  onSubmit: (data: CreatePostData) => void;
  placeholder?: string;
  maxImages?: number;
  allowedPrivacyOptions?: PrivacyOption[];
  showPrivacySelector?: boolean;
  showTagging?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

interface CreatePostData {
  content: string;
  images: string[];
  privacy?: "public" | "friends" | "private";
  location?: string;
  tags?: string[];
  feeling?: string;
}

interface PrivacyOption {
  value: "public" | "friends" | "private";
  label: string;
  icon?: React.ReactNode;
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  bgColor: string;
  onClick: () => void;
}

const CreatePost = ({
  user,
  onSubmit,
  placeholder,
  maxImages = 10,
  allowedPrivacyOptions = [
    { value: "public", label: "Public" },
    { value: "friends", label: "Friends" },
    { value: "private", label: "Only me" },
  ],
  showPrivacySelector = true,
  showTagging = true,
  disabled = false,
  loading = false,
  className,
}: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "friends" | "private">(
    "public"
  );
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [feeling, setFeeling] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultPlaceholder = `What's on your mind, ${user.username}?`;

  const handleSubmit = () => {
    if (content.trim() || images.length > 0) {
      const postData: CreatePostData = {
        content: content.trim(),
        images,
        privacy,
        location: location || undefined,
        tags: tags.length > 0 ? tags : undefined,
        feeling: feeling || undefined,
      };

      onSubmit(postData);

      // Reset form
      setContent("");
      setImages([]);
      setPrivacy("public");
      setLocation("");
      setTags([]);
      setFeeling("");
      setIsExpanded(false);
    }
  };

  const handleImageUpload = () => {
    if (images.length >= maxImages) return;

    // Mock image upload - in real app, this would handle file upload
    const mockImageUrl = "/placeholder.svg?height=300&width=400";
    setImages([...images, mockImageUrl]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const quickActions: QuickAction[] = [
    {
      icon: Video,
      label: "Live video",
      color: "text-red-500",
      bgColor: "hover:bg-red-50",
      onClick: () => setIsExpanded(true),
    },
    {
      icon: ImageIcon,
      label: "Photo/video",
      color: "text-green-500",
      bgColor: "hover:bg-green-50",
      onClick: () => {
        handleImageUpload();
        setIsExpanded(true);
      },
    },
    {
      icon: Smile,
      label: "Feeling/activity",
      color: "text-yellow-500",
      bgColor: "hover:bg-yellow-50",
      onClick: () => setIsExpanded(true),
    },
  ];

  const additionalActions = [
    { icon: Users, label: "Tag people", color: "text-blue-500" },
    { icon: MapPin, label: "Check in", color: "text-red-500" },
    { icon: Gift, label: "Life event", color: "text-purple-500" },
  ];

  return (
    <Card className={cn("shadow-sm border-gray-200", className)}>
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <UserAvatar user={user} size="md" showOnlineStatus />
          <div className="flex-1">
            {!isExpanded ? (
              <Button
                variant="ghost"
                className="w-full justify-start h-12 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500"
                onClick={() => setIsExpanded(true)}
                disabled={disabled}
              >
                {placeholder || defaultPlaceholder}
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Privacy Selector */}
                {showPrivacySelector && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Post to:</span>
                    <Select
                      value={privacy}
                      onValueChange={(value: any) => setPrivacy(value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {allowedPrivacyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Content Input */}
                <Textarea
                  placeholder={placeholder || defaultPlaceholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] border-none resize-none focus:ring-0 p-0 text-lg placeholder:text-gray-500"
                  autoFocus
                  disabled={disabled}
                />

                {/* Images */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Add to your post
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleImageUpload}
                      className="h-8 w-8 p-0"
                      disabled={images.length >= maxImages}
                    >
                      <ImageIcon className="h-5 w-5 text-green-500" />
                    </Button>
                    {additionalActions.map((action) => (
                      <Button
                        key={action.label}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title={action.label}
                      >
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </Button>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsExpanded(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        (!content.trim() && images.length === 0) ||
                        loading ||
                        disabled
                      }
                      className="px-8 bg-blue-500 hover:bg-blue-600"
                    >
                      {loading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isExpanded && (
          <>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-1">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className={`flex items-center justify-center space-x-2 h-10 ${action.bgColor} ${action.color}`}
                  onClick={action.onClick}
                  disabled={disabled}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatePost;
