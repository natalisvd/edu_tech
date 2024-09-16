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

  if (loading || !currentCourse) return <div>Loading...</div>;

  const formatLessonNumber = (index: number) => {
    return index < 9 ? `0${index + 1}` : `${index + 1}`;
  };

  const handleLessonClick = (lessonId: string) => {
    console.log(`Lesson clicked: ${lessonId}`);
  };

  return (
    <div className="max-w-[90%] mx-auto p-12"> 
      <div className="flex flex-col gap-12 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <Image
              src={getFullUrl(currentCourse.courseImageUrl)}
              alt={currentCourse.name}
              className="w-full h-auto rounded-lg"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {currentCourse.name}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {currentCourse.description}
            </p>

            <div className="flex items-center gap-6 mb-12">
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
                <p className="text-2xl font-semibold text-gray-900">
                  {currentCourse.author.firstName} {currentCourse.author.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Lessons</h2>
          {currentCourse.lessons && currentCourse.lessons.length > 0 ? (
            <ul>
              {currentCourse.lessons.map((lesson, index) => (
                <li
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id+'')} 
                  className={`p-4 rounded-lg mb-4 text-white cursor-pointer transition-transform transform hover:scale-105 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-600"
                  }`}
                >
                  <div className="text-2xl font-bold text-gray-200">
                    {formatLessonNumber(index)}. {lesson.title}
                  </div>
                  <p className="text-lg text-gray-300 mt-2">{lesson.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-500">No lessons available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
