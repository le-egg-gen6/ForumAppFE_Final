export const formatTimeAgo = (date: Date): string => {
  const now = new Date(0);
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / 1000 / 60
  );

  if (diffInMinutes < 1) {
    return "Just now";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  if (diffInMinutes < 24 * 60) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  }
  if (diffInMinutes < 7 * 24 * 60) {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
  return `${Math.floor(diffInMinutes / 10080)}w ago`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
