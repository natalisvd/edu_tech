"use client";
import { selectCurrentUser, fetchCurrentUser } from "../store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useUser() {
  const { user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(fetchCurrentUser());
      } else {
        router.push("/login");
      }
    }
  }, [user, dispatch, router]);

  return user;
}
