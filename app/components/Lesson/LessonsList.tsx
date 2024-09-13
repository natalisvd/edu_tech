import { ILesson } from "@/app/interfaces/interfaces";
import { useAppDispatch } from "@/app/store/hooks";
import { fetchDeleteLesson } from "@/app/store/slices/currentCourseSlice";
import React from "react";
import LessonModal from "../Modals/LessonModal";

interface LessonsListProps {
  lessons: ILesson[];
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons }) => {
  const sortedLessons = [...lessons].sort(
    (a, b) => a.indexNumber - b.indexNumber
  );

  const dispatch = useAppDispatch();

  const deleteHandle = (id: string) => {
    dispatch(fetchDeleteLesson(id));
  };
  const editHandle = (lesson: ILesson) => {};

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
            <LessonModal lesson={lesson} key={lesson.id} />
            <button
              onClick={() => deleteHandle(lesson.id + "")}
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
