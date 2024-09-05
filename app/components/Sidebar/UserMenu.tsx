"use client";
import { useUser } from "@/app/hooks/auth.hook";
import { MenuItem } from "./MenuItem";
import { isTeamLeader } from "@/app/helpers/roles.helper";

export const UserMenu = () => {
  const user = useUser();
  return (
    <>
      <MenuItem href="/account">Account Settings</MenuItem>
      <MenuItem href="/my_skills">My Skills</MenuItem>
      <MenuItem href="#">User link 3</MenuItem>
      {isTeamLeader(user) && (
        <MenuItem href="/create-course">Create course</MenuItem>
      )}
    </>
  );
};
