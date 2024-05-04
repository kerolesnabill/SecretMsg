import { createContext } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  views: number;
  available: boolean;
  showLastSeen: boolean;
  lastSeen: Date;
  createdAt: Date;
}
export type NullableUser = IUser | null;

type IUserContext = {
  user: NullableUser;
  setUser: any;
} | null;

const UserContext = createContext<IUserContext>(null);

export default UserContext;
