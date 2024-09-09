"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createCourseApi, updateCourseApi, getCourseByIdApi } from "@/app/api";
import { ICourse } from "@/app/interfaces/interfaces";
import { useUser } from "@/app/hooks/auth.hook";

const validationSchema = Yup.object({
  courseName: Yup.string().required("Course name is required"),
  description: Yup.string().required("Description is required"),
});

interface FormValues {
  courseName: string;
  description: string;
}

interface CourseFormProps {
  courseId?: string;
}

export default function CourseForm({ courseId }: CourseFormProps) {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const formik = useFormik<FormValues>({
    initialValues: {
      courseName: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const newCourse: ICourse = {
        id: courseId,
        name: values.courseName,
        description: values.description,
        authorId: user!.id,
      };

      try {
        if (courseId) {
          await updateCourseApi(newCourse);
        } else {
          await createCourseApi(newCourse);
        }
        router.push("/courses-list");
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (courseId) {
      setIsLoading(true);
      getCourseByIdApi(courseId)
        .then((course) => {
          formik.setValues({
            courseName: course.name || "",
            description: course.description || "",
          });
        })
        .catch((error) => {
          console.error("Failed to fetch course data", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [courseId]);

  if (isLoading) {
    return <div>Loading...</div>; // Можно сделать лучшее отображение загрузки
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {courseId ? "Edit Course" : "Create a Course"}
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Поле для названия курса */}
        <div className="form-control">
          <label
            htmlFor="courseName"
            className="block text-gray-700 font-medium mb-2"
          >
            Course Name
          </label>
          <input
            id="courseName"
            name="courseName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.courseName}
            className={`w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${
              formik.touched.courseName && formik.errors.courseName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.courseName && formik.errors.courseName ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.courseName}
            </div>
          ) : null}
        </div>

        {/* Описание курса */}
        <div className="form-control">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={3}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {courseId ? "Update Course" : "Create Course"}
        </button>
      </form>
    </div>
  );
}
