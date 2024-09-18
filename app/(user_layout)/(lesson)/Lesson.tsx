"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import { getLessonByIdApi } from "../../api";
import { ILessonWithCourse } from "../../interfaces/interfaces";
// import { getFullUrl } from "../helpers/image.helper";
import { motion } from "framer-motion";
import PaginatedText from "./PaginatedText"; 

export const Lesson = ({ lessonId }: { lessonId: string }) => {
  const [lesson, setLesson] = useState<ILessonWithCourse | null>(null);

  useEffect(() => {
    getLessonByIdApi(lessonId).then((resp) => setLesson(resp));
  }, [lessonId]);

  if (!lesson) {
    return <p>Loading...</p>;
  }

  return (
    <motion.div
      className="max-w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg w-full" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 
      <div className="flex items-start mb-6">
        {lesson.Course.courseImageUrl ? (
          <div className="w-[80%] h-[auto] flex-shrink-0 overflow-hidden rounded-lg mr-6">
            <Image
              src={getFullUrl(lesson.Course.courseImageUrl)}
              alt={lesson.Course.name}
              className="object-cover w-full h-full"
              width={300}
              height={300}
              priority
            />
          </div>
        ) : (
          <div className="w-[80%] h-[auto] bg-gray-200 flex items-center justify-center rounded-lg mr-6">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {`Lesson ${lesson.indexNumber}: ${lesson.title}`}
        </h1>

        {/* Используем компонент PaginatedText для отображения текста с пагинацией */}
        <PaginatedText text={lesson.text} />

        <div>
          <h2 className="text-xl font-semibold mb-4">Materials</h2>
          {lesson.materials && lesson.materials.length > 0 ? (
            <ul className="list-none text-gray-700">
              {lesson.materials.map((material, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={material}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {material}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No materials available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Lesson;
