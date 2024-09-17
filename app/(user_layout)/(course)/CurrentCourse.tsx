"use client";
import { useUser } from "@/app/hooks/auth.hook";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchGetCourseById,
  selectCurrnetCourse,
} from "@/app/store/slices/currentCourseSlice";
import React, { useEffect } from "react";
import Image from "next/image";
import { getFullUrl } from "@/app/helpers/image.helper";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CourseFormProps {
  courseId?: string;
}

export const CurrentCourse = ({ courseId }: CourseFormProps) => {
  const user = useUser();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentCourse, loading } = useAppSelector(selectCurrnetCourse);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchGetCourseById(courseId));
    }
  }, [courseId, dispatch]);

  if (loading || !currentCourse) return <div>Loading...</div>;

  const formatLessonNumber = (index: number) => {
    return index < 9 ? `0${index + 1}` : `${index + 1}`;
  };

  const handleLessonClick = (lessonId: string) => {
    router.push(`/current-lesson/${lessonId}`);
  };

  return (
    <motion.div
      className="max-w-[90%] mx-auto p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-12 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="relative w-full lg:w-[300px] lg:h-[300px]">
            <Image
              src={getFullUrl(currentCourse.courseImageUrl)}
              alt={currentCourse.name}
              className="w-full h-full object-cover rounded-lg"
              layout="fill"
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentCourse.name}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {currentCourse.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <Image
                src={getFullUrl(currentCourse.author.avatarUrl)}
                alt={`${currentCourse.author.firstName} ${currentCourse.author.lastName}`}
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
                priority
              />
              <div>
                <p className="text-lg text-gray-500">Author:</p>
                <p className="text-xl font-semibold text-gray-900">
                  {currentCourse.author.firstName} {currentCourse.author.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Lessons</h2>
          {currentCourse.lessons && currentCourse.lessons.length > 0 ? (
            <ul>
              {currentCourse.lessons.map((lesson, index) => (
                <motion.li
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id + '')}
                  className={`p-4 rounded-lg mb-4 cursor-pointer transition-transform transform ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-600"
                  }`}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold text-gray-200 mb-2">
                    {formatLessonNumber(index)}. {lesson.title}
                  </div>
                  <p className="text-lg text-gray-300 mt-2 truncate">
                    {lesson.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-500">No lessons available yet.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentCourse;
