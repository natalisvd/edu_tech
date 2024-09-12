import { ILesson } from "@/app/interfaces/interfaces";
import React from "react";

interface LessonsListProps {
  lessons: ILesson[];
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons }) => {
  const sortedLessons = [...lessons].sort(
    (a, b) => a.indexNumber - b.indexNumber
  );
  const deleteHandle = (e: any, id: string) => {
    e.preventDefault();
  };
  const editHandle = (e: any, lesson: ILesson) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4">
      {sortedLessons.map((lesson) => (
        <div
          key={lesson.id || lesson.indexNumber}
          className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-bold">Lesson {lesson.indexNumber}</p>
            <p className="text-gray-700">{lesson.title}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => editHandle(e, lesson)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={(e) => deleteHandle(e, lesson.id + "")}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonsList;
