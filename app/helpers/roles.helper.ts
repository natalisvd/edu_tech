import { IUser, Role } from "../interfaces/interfaces";

export const isTeamLeader = (user: IUser | null): boolean => {
    if(!user) return false
    return user.roles.includes(Role.TEAMLEADER);
  };