import { create } from "zustand";
import type { Notification } from "@/shared/dto/Notification";
import type { FriendRequest } from "@/shared/dto/Friend";

interface NotificationStore {
  notifications: Notification[];
  friendRequests: FriendRequest[];
  addNotification: (notification: Notification) => void;
  addFriendRequest: (friendRequest: FriendRequest) => void;
  removeFriendRequest: (friendRequest: FriendRequest) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  /* ── State ───────────────────────────────────────────── */
  notifications: [],
  friendRequests: [],

  /* ── Actions ─────────────────────────────────────────── */
  addNotification: (notif) =>
    set((state) => ({
      notifications: [...state.notifications, notif],
    })),

  addFriendRequest: (req) =>
    set((state) => ({
      friendRequests: [...state.friendRequests, req],
    })),

  removeFriendRequest: (reqToRemove) =>
    set((state) => ({
      friendRequests: state.friendRequests.filter(
        (r) =>
          r !== reqToRemove &&
          (r.id === undefined || reqToRemove.id === undefined || r.id !== reqToRemove.id)
      ),
    })),
}));
