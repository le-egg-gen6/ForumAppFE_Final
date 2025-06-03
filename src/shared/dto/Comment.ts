import type { Reaction } from "./Reaction";
import type { SimpleUserInfo } from "./User";

export interface CommentInfo {
  id: number;
  body: string;
  author: SimpleUserInfo;
  postId: number;
  createdAt: Date;
  reactions: Reaction[];
}

export interface SimpleCommentInfo {
  id: number;
  body: string;
  author: SimpleUserInfo;
  postId: number;
  createdAt: Date;
}