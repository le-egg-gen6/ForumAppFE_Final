export interface SimpleUserInfo {
  id: number;
  username: string;
  avatar: string | null;
  online: boolean;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avartar: string | null;
  createdAt: Date;
  online: boolean;
}
