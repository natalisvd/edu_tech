"use client";
import { useUser } from "@/app/hooks/auth.hook";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchGetCourseById, selectCurrnetCourse } from "@/app/store/slices/currentCourseSlice";
import React, { useEffect } from "react";

interface CourseFormProps {
  courseId?: string;
}
export const CurrentCourse = ({ courseId }: CourseFormProps) => {
  const user = useUser();
  const dispatch = useAppDispatch();

  const { currentCourse, loading } = useAppSelector(selectCurrnetCourse);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchGetCourseById(courseId));
    }
  }, [courseId, dispatch]);

  console.log({ currentCourse });
  return <div>CurrentCourse</div>;
};
