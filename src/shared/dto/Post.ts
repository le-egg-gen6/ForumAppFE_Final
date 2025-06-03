import type { CommentInfo } from "./Comment";
import type { Reaction } from "./Reaction";
import type { SimpleUserInfo } from "./User";

export interface PostInfo {
  id: number;
  content: string;
  author: SimpleUserInfo;
  images: string[];
  createdAt: Date;
  reactions: Reaction[];
  topComments: CommentInfo[];
}

export interface SimplePostInfo {
  id: number;
  content: string;
  author: SimpleUserInfo;
  images: string[];
  createdAt: Date;
}
