"use client";

import { useEffect, useState } from "react";
import { getLessonByIdApi } from "../api";
import { ILesson } from "../interfaces/interfaces";

export const Lesson = ({ lessonId }: { lessonId: string }) => {
  const [lesson, setLesson] = useState<ILesson | null>(null);
  useEffect(() => {
    getLessonByIdApi(lessonId).then((resp) => setLesson(resp));
  }, [lessonId]);



return (
  <div>
    {lesson ? (
      <div>
        <h1>{lesson.title}</h1>
        <p>{lesson.text}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
};
