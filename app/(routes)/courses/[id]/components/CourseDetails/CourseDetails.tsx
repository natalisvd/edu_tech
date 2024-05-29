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
  return (
    <div className="mr-10">
      <h1 className="text-3xl font-bold">{course[0]?.name}</h1>
      <div className="py-6">
        <p>{course[0]?.Description}</p>

        <Modal description={course[0]?.Description} id={id} />
      </div>
    </div>
  );
};

export default CourseDetails;
