// src/store/useRoomChatStore.ts
import { create } from "zustand";
import type { RoomInfo } from "@/shared/dto/RoomChat";

interface RoomChatState {
  mapRoomIDToRoomInfos: Record<number, RoomInfo>;
  mapRoomIDToFetchAllMessageState: Record<number, boolean>;
  mapRoomIDToNewMessageState: Record<number, boolean>;
  addOrUpdateRoomInfo: (roomInfo: RoomInfo) => void;
  removeRoomInfo: (roomId: number) => void;
  setRoomFetchAllMessageState: (roomId: number, state: boolean) => void;
  getRoomFetchAllMessageState: (roomId: number) => boolean;
  setRoomNewMessageState: (roomId: number, state: boolean) => void;
  getRoomNewMessageState: (roomId: number) => boolean;
}

export const useRoomChatStore = create<RoomChatState>((set, get) => ({
  // ─── State ───────────────────────────────────────────────
  mapRoomIDToRoomInfos: {},
  mapRoomIDToFetchAllMessageState: {},
  mapRoomIDToNewMessageState: {},

  // ─── Actions ─────────────────────────────────────────────
  addOrUpdateRoomInfo: (roomInfo) =>
    set((state) => ({
      mapRoomIDToRoomInfos: {
        ...state.mapRoomIDToRoomInfos,
        [roomInfo.id]: {
          ...(state.mapRoomIDToRoomInfos[roomInfo.id] ?? {}),
          ...roomInfo,
        },
      },
    })),

  /** Remove a room and all related flags. */
  removeRoomInfo: (roomId) =>
    set((state) => {
      const { [roomId]: _, ...rooms } = state.mapRoomIDToRoomInfos;
      const { [roomId]: __, ...fetchFlags } =
        state.mapRoomIDToFetchAllMessageState;
      const { [roomId]: ___, ...newFlags } =
        state.mapRoomIDToNewMessageState;
      return {
        mapRoomIDToRoomInfos: rooms,
        mapRoomIDToFetchAllMessageState: fetchFlags,
        mapRoomIDToNewMessageState: newFlags,
      };
    }),

  setRoomFetchAllMessageState: (roomId, value) =>
    set((state) => ({
      mapRoomIDToFetchAllMessageState: {
        ...state.mapRoomIDToFetchAllMessageState,
        [roomId]: value,
      },
    })),

  getRoomFetchAllMessageState: (roomId) =>
    get().mapRoomIDToFetchAllMessageState[roomId] ?? false,

  setRoomNewMessageState: (roomId, value) =>
    set((state) => ({
      mapRoomIDToNewMessageState: {
        ...state.mapRoomIDToNewMessageState,
        [roomId]: value,
      },
    })),

  getRoomNewMessageState: (roomId) =>
    get().mapRoomIDToNewMessageState[roomId] ?? false,
}));
