"use client";

import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "@/app/hooks/auth.hook";
import { ICourseWithAuthor } from "@/app/interfaces/interfaces";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getFullUrl } from "@/app/helpers/image.helper";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchDeleteCourse,
  fetchGetAllCourses,
  selectCourses,
} from "@/app/store/slices/coursesSlice";
import { motion } from "framer-motion";

const DEFAULT_IMAGE_URL =
  "https://erudyt.net/wp-content/uploads/2020/09/recursosprogramadores.png";

export default function CoursesList() {
  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCourses, loading } = useAppSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchGetAllCourses());
  }, [dispatch]);

  const handleDelete = async (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await dispatch(fetchDeleteCourse(courseId));
      } catch (error) {
        console.error("Failed to delete course", error);
      }
    }
  };

  const handleEdit = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/update-course/${courseId}`);
  };

  if (!user || loading || !allCourses) return <div>Loading...</div>;

  const handleCourseSelect = (courseId: string) => {
    router.push(`/current-course/${courseId}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Courses List</h1>
      {allCourses?.length === 0 ? (
        <p className="text-gray-600">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {allCourses?.map((course: ICourseWithAuthor) => (
            <motion.div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-lg relative flex cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
              onClick={() => handleCourseSelect(course.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
            >
              {user.id === course.author.id && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => handleEdit(course.id, e)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="transition-transform transform hover:scale-150 hover:opacity-80" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(course.id, e)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="transition-transform transform hover:scale-150 hover:opacity-80" />
                  </button>
                </div>
              )}

              <div className="w-1/3 h-auto">
                <Image
                  src={
                    course.courseImageUrl
                      ? getFullUrl(course.courseImageUrl)
                      : DEFAULT_IMAGE_URL
                  }
                  alt={`${course.name} Image`}
                  className="w-full h-full object-cover rounded-lg"
                  width={300}
                  height={200}
                  priority
                />
              </div>

              <div className="ml-6 flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <Image
                    src={getFullUrl(course.author.avatarUrl)}
                    alt={`${course.author.firstName} ${course.author.lastName}`}
                    className="w-12 h-12 rounded-full"
                    width={48}
                    height={48}
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
