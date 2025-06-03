import type { Reaction } from "./Reaction";
import type { SimpleUserInfo } from "./User";

export interface MessageInfo {
    id : number;
    body: string;
    type: "text" | "notification";
    author: SimpleUserInfo;
    reactions: Reaction[];
    createdAt: Date;
}