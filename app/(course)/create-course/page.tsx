'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

type FormValues = {
  title: string;
  description: string;
  tags: string[];
  materials: string[];
};

export default function CreateCourse() {
  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      materials: [],
    },
  });

  const { register, handleSubmit, watch, setValue, getValues } = methods;

  const [newTag, setNewTag] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  const handleAddTag = () => {
    const tags = getValues('tags');
    if (newTag && !tags.includes(newTag)) {
      setValue('tags', [...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    const tags = getValues('tags').filter((t) => t !== tag);
    setValue('tags', tags);
  };

  const handleAddMaterial = () => {
    if (newMaterial) {
      const materials = getValues('materials');
      setValue('materials', [...materials, newMaterial]);
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (material: string) => {
    const materials = getValues('materials').filter((m) => m !== material);
    setValue('materials', materials);
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <FormProvider {...methods}>
      <div className="p-8 bg-[#F9F9F9] shadow-lg rounded-lg max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-[#1C274C] mb-8">Create a New Course</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Course Title */}
          <div className="form-control">
            <label htmlFor="title" className="block text-[#1C274C] font-semibold mb-2 text-lg">Course Title</label>
            <input
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="w-full border border-[#D1D5DB] p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C274C]"
              placeholder="Enter course title"
            />
          </div>

          {/* Tags */}
          <div className="form-control">
            <label className="block text-[#1C274C] font-semibold mb-2 text-lg">Tags</label>
            <div className="flex flex-wrap gap-3 mb-4">
              {watch('tags').map((tag: string) => (
                <div key={tag} className="flex items-center bg-[#E0E7FF] px-4 py-2 rounded-full text-[#1C274C] text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500 text-lg"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="border border-[#D1D5DB] p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#1C274C]"
                placeholder="Add new tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-4 bg-[#1C274C] text-white px-4 py-2 rounded-md hover:bg-[#334466]"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label htmlFor="description" className="block text-[#1C274C] font-semibold mb-2 text-lg">Description</label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full border border-[#D1D5DB] p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C274C]"
              placeholder="Enter course description"
              rows={6}
            />
          </div>

          {/* Study Materials */}
          <div className="form-control">
            <label className="block text-[#1C274C] font-semibold mb-2 text-lg">Study Materials</label>
            <div className="space-y-2 mb-4">
              {watch('materials').map((material: string) => (
                <div key={material} className="flex justify-between items-center bg-[#E0E7FF] p-3 rounded-md">
                  <span className="text-[#1C274C] text-sm">{material}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(material)}
                    className="text-red-500 text-lg"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                className="border border-[#D1D5DB] p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#1C274C]"
                placeholder="Add study material link"
              />
              <button
                type="button"
                onClick={handleAddMaterial}
                className="ml-4 bg-[#1C274C] text-white px-4 py-2 rounded-md hover:bg-[#334466]"
              >
                Add Material
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1C274C] text-white px-6 py-3 rounded-md hover:bg-[#334466]"
          >
            Create Course
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
