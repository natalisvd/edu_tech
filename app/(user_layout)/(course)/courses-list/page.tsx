"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "@/app/hooks/auth.hook";
import { deleteCourseApi, getAllCourseApi } from "@/app/api";
import { ICourseWithAuthor } from "@/app/interfaces/interfaces";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAvatarUrl } from "@/app/helpers/image.helper";

export default function CoursesList() {
  const [courses, setCourses] = useState<ICourseWithAuthor[]>([]);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Courses List</h1>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
              {user.id === course.author.id && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(course.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {course.name}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex items-center gap-3 mt-6">
                <Image
                  src={getAvatarUrl(course.author.avatarUrl)}
                  alt={`${course.author.firstName} ${course.author.lastName}`}
                  className="w-10 h-10 rounded-full"
                  width={114}
                  height={114}
                  priority
                />
                <div>
                  <p className="text-sm text-gray-500">Author:</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {course.author.firstName} {course.author.lastName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
