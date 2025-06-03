// src/store/useRoomMessageStore.ts
import { create } from "zustand";
import type { MessageInfo } from "@/shared/dto/RoomMessage";

interface RoomMessageState {
  mapRoomIDToMessages: Record<number, MessageInfo[]>;
  addMessage: (roomId: number, message: MessageInfo) => void;
  updateMessage: (
    roomId: number,
    messageId: number,
    message: MessageInfo
  ) => void;
}

const insertSorted = (arr: MessageInfo[], msg: MessageInfo) => {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid].createdAt < msg.createdAt) lo = mid + 1;
    else hi = mid;
  }
  arr.splice(lo, 0, msg);
};

export const useRoomMessageStore = create<RoomMessageState>((set) => ({
  mapRoomIDToMessages: {},

  addMessage: (roomId, message) =>
    set((state) => {
      // ensure room array exists
      const list = state.mapRoomIDToMessages[roomId] ?? [];
      // normalize createdAt
      const msg = {
        ...message,
        createdAt:
          message.createdAt instanceof Date
            ? message.createdAt
            : new Date(message.createdAt),
      };
      insertSorted(list, msg);
      return {
        mapRoomIDToMessages: {
          ...state.mapRoomIDToMessages,
          [roomId]: list,
        },
      };
    }),

  updateMessage: (roomId, messageId, newMessage) =>
    set((state) => {
      const list = state.mapRoomIDToMessages[roomId];
      if (!list) return state;

      // remove the old message
      const filtered = list.filter((m) => m.id !== messageId);

      // normalize & insert the replacement so order is preserved
      const normalized = {
        ...newMessage,
        createdAt:
          newMessage.createdAt instanceof Date
            ? newMessage.createdAt
            : new Date(newMessage.createdAt),
      };
      insertSorted(filtered, normalized);

      return {
        mapRoomIDToMessages: {
          ...state.mapRoomIDToMessages,
          [roomId]: filtered,
        },
      };
    }),
}));
