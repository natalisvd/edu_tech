"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createCourseApi, updateCourseApi, getCourseByIdApi } from "@/app/api";
import { useUser } from "@/app/hooks/auth.hook";
import { getFullUrl } from "@/app/helpers/image.helper"; 

const validationSchema = Yup.object({
  courseName: Yup.string().required("Course name is required"),
  description: Yup.string().required("Description is required"),
});

interface FormValues {
  courseName: string;
  description: string;
  courseImage: File | null; 
}

interface CourseFormProps {
  courseId?: string;
}

export default function CourseForm({ courseId }: CourseFormProps) {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); 
  const formik = useFormik<FormValues>({
    initialValues: {
      courseName: "",
      description: "",
      courseImage: null, 
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.courseName);
      formData.append("description", values.description);
      formData.append("authorId", user!.id);
      
      if (values.courseImage) {
        formData.append("image", values.courseImage); 
      }

      try {
        if (courseId) {
          await updateCourseApi(courseId, formData);
        } else {
          await createCourseApi(formData);
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
            courseImage: null, 
          });
          if (course.courseImageUrl) {
            setPreviewImage(getFullUrl(course.courseImageUrl)); 
          }
        })
        .catch((error) => {
          console.error("Failed to fetch course data", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [courseId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue("courseImage", file); 
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); 
    } else {
      setPreviewImage(null); 
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {courseId ? "Edit Course" : "Create a Course"}
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="courseImage"
            className="relative w-40 h-40 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-300 flex items-center justify-center"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-3xl">+</span>
            </div>
          </label>
          <input
            id="courseImage"
            name="courseImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

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
