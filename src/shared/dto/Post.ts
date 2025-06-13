import type { CommentInfo } from "./Comment";
import type { Reaction } from "./Reaction";
import type { SimpleUserInfo } from "./User";

export interface PostInfo {
  id: number;
  privacy: string;
  location: string;
  content: string;
  tags: string[];
  author: SimpleUserInfo;
  images: string[];
  createdAt: Date;
  reactions: Reaction[];
  comments: CommentInfo[];
}

export interface SimplePostInfo {
  id: number;
  content: string;
  privacy: string;
  location: string;
  tags: string[];
  author: SimpleUserInfo;
  images: string[];
  createdAt: Date;
}
