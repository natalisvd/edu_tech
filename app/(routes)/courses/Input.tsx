"use client";

import React, { useState } from "react";
import Card from "./Card";

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
      <input
        value={value}
        onChange={handleChange}
        type="text"
        placeholder="Search for Courses"
        className="input input-bordered w-full max-w"
      />
      <div className="flex mt-10">
        {" "}
        {filteredCourses?.map((course) => (
          // @ts-ignore
          <Card key={course.id} title={course.name} id={course.id} />
        ))}
      </div>
    </div>
  );
};

export default Input;
