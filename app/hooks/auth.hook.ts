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
    getCurrentUser();
  }, [user, dispatch, router]);

  const getCurrentUser = async () => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await dispatch(fetchCurrentUser()).unwrap();
        } catch (error: any) {
          if (error.message === "Unauthorized") {
            router.push("/login");
          } else {
            console.error("Error fetching user:", error);
          }
        }
      } else {
        router.push("/login");
      }
    }
  };

  return user;
}
