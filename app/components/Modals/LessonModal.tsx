"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { createLessonApi, updateLessonApi, getLessonByIdApi } from "@/app/api";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  text: Yup.string(),
  materials: Yup.array().of(Yup.string()).required("Materials are required"),
  indexNumber: Yup.number().required("Index number is required").positive().integer(),
});

interface LessonModalProps {
  courseId: string;
  lessonId?: string;
}

const LessonModal = ({ courseId, lessonId }: LessonModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      materials: [""], 
      indexNumber: 1,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // if (lessonId) {
        //   await updateLessonApi(lessonId, values);
        // } else {
        //   await createLessonApi({ ...values, courseId });
        // }
        console.log("Lesson saved:", { ...values, courseId });
        // Redirect or update the state as needed
        closeModal();
      } catch (error) {
        console.error("Failed to save lesson", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (lessonId) {
      setIsLoading(true);
      // getLessonByIdApi(lessonId)
      //   .then((lesson) => {
      //     formik.setValues({
      //       title: lesson.title || "",
      //       text: lesson.text || "",
      //       materials: lesson.matrials || [""],
      //       indexNumber: lesson.indexNumber || 1,
      //     });
      //   })
      //   .catch((error) => {
      //     console.error("Failed to fetch lesson", error);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
      console.log("Fetched lesson for editing:", lessonId);
      // For demonstration, assume the lesson data is fetched and set:
      formik.setValues({
        title: "Sample Title",
        text: "Sample Text",
        materials: ["Material 1", "Material 2"],
        indexNumber: 1,
      });
      setIsLoading(false);
    }
  }, [lessonId]);

  const handleMaterialChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaterials = [...formik.values.materials];
    newMaterials[index] = event.target.value;
    formik.setFieldValue("materials", newMaterials);
  };

  const addMaterialField = () => {
    formik.setFieldValue("materials", [...formik.values.materials, ""]);
  };

  const removeMaterialField = (index: number) => {
    const newMaterials = formik.values.materials.filter((_, i) => i !== index);
    formik.setFieldValue("materials", newMaterials);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{lessonId ? "Edit Lesson" : "Create Lesson"}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={`w-full p-2 border rounded ${formik.touched.title && formik.errors.title ? "border-red-500" : "border-gray-300"}`}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="text" className="block text-gray-700 font-medium mb-1">Text</label>
            <textarea
              id="text"
              name="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              className="w-full p-2 border rounded border-gray-300"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Materials</label>
            {formik.values.materials.map((material, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={material}
                  onChange={(event) => handleMaterialChange(index, event)}
                  className="flex-1 p-2 border rounded border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeMaterialField(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMaterialField}
              className="text-blue-500"
            >
              Add Material
            </button>
            {formik.touched.materials && formik.errors.materials ? (
              <div className="text-red-500 text-sm">{formik.errors.materials}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="indexNumber" className="block text-gray-700 font-medium mb-1">Index Number</label>
            <input
              id="indexNumber"
              name="indexNumber"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.indexNumber}
              className={`w-full p-2 border rounded ${formik.touched.indexNumber && formik.errors.indexNumber ? "border-red-500" : "border-gray-300"}`}
            />
            {formik.touched.indexNumber && formik.errors.indexNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.indexNumber}</div>
            ) : null}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : lessonId ? "Update Lesson" : "Create Lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonModal;
