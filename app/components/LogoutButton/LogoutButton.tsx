"use client";

import { useAppDispatch } from "@/app/store/hooks";
import { logout } from "@/app/store/slices/userSlice";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        dispatch(logout());
      }}
    >
      Log out
    </button>
  );
};
