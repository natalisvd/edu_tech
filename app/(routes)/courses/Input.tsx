"use client";

import React, { useState } from "react";
import Card from "./Card";
import AddButton from "./components/AddButton/AddButton";
import CoursesModal from "./components/CoursesModal/CoursesModal";

interface Course {
  id: number;
  name: string;
}

interface Props {
  courses: Course[];
}

const Input: React.FC<Props> = ({ courses }) => {
  const [value, setValue] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);

    const filtered = courses?.filter((course) =>
      course.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <div className="w-full">
        <input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Search for Courses"
          className="input input-bordered w-full"
        />
        <div className="flex justify-end mt-2">
          {/* <AddButton /> */}
          <CoursesModal />
        </div>
      </div>
      <div className="flex mt-10 flex-wrap justify-center">
        {filteredCourses?.map((course) => (
          // @ts-ignore
          <Card key={course.id} title={course.name} id={course.id} />
        ))}
      </div>
    </div>
  );
};

export default Input;
