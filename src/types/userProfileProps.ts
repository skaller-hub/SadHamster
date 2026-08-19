import { User } from "./user";
export interface UserProfileProps {
  userProfile: User;
  setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}
