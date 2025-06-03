import { create } from "zustand";
import type { Notification } from "@/shared/dto/Notification";
import type { FriendRequest } from "@/shared/dto/Friend";

interface NotificationStore {
  notification: Notification[];
  friendRequest: FriendRequest[];
  addNotification: (notification: Notification) => void;
  addFriendRequest: (friendRequest: FriendRequest) => void;
  removeFriendRequest: (friendRequest: FriendRequest) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  /* ── State ───────────────────────────────────────────── */
  notification: [],
  friendRequest: [],

  /* ── Actions ─────────────────────────────────────────── */
  addNotification: (notif) =>
    set((state) => ({
      notification: [...state.notification, notif],
    })),

  addFriendRequest: (req) =>
    set((state) => ({
      friendRequest: [...state.friendRequest, req],
    })),

  removeFriendRequest: (reqToRemove) =>
    set((state) => ({
      friendRequest: state.friendRequest.filter(
        (r) =>
          r !== reqToRemove &&
          (r.id === undefined || reqToRemove.id === undefined || r.id !== reqToRemove.id)
      ),
    })),
}));
