import type { SimpleUserInfo } from "./User";

export interface RoomInfo {
    id :number;
    name: string;
    type: "private" | "group";
    participantInfos: SimpleUserInfo[];
}