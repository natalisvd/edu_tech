"use client";

import { useParams, usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";

import { getCoursesById } from "../../../action";
import Button from "../../../components/Button/button";

interface CourseProps {
  course: any;
  id: any;
}

const CourseDetails: FC<CourseProps> = ({ id, course }) => {
  // getCoursesById(1);

  console.log(id);
  return (
    <div className="mr-10">
      <h1 className="text-3xl font-bold">{course[0]?.name}</h1>
      <p className="py-6">
        {course[0]?.Description}

        <Modal description={course[0]?.Description} id={id} />
      </p>
    </div>
  );
};

export default CourseDetails;
