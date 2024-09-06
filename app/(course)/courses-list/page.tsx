"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "@/app/hooks/auth.hook";
import { deleteCourseApi, getAllCourseApi } from "@/app/api"; 
import { ICourse } from "@/app/interfaces/interfaces"; 
import { useRouter } from "next/navigation";

export default function CoursesList() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getAllCourseApi()
      .then((fetchedCourses) => {
        setCourses(fetchedCourses);
      })
      .catch((error) => {
        console.error("Failed to fetch courses", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourseApi(courseId);
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
      } catch (error) {
        console.error("Failed to delete course", error);
      }
    }
  };

  const handleEdit = (courseId: string) => {
    router.push(`/update-course/${courseId}`);
  };

  if (!user || isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Courses List</h1>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800">{course.name}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <div className="flex gap-2 mt-4">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {user.id === course.authorId && (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(course.id + "")}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id + "")}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
