"use client";

import { FC } from "react";
import ButtonLesson from "./Button-lesson";
import Image from "next/image";

interface LessonsProps {
  id: number;
  name: string;
  description: string;
  img: string;
  lessonId: string;
}

const Lessons: FC<LessonsProps> = ({
  id,
  lessonId,
  name,
  description,
  img,
}) => {
  return (
    <div className="mb-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <Image
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            alt="Album"
            width={400}
            height={400}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Lesson {id}</h2>
          <p>{name}</p>
          <div className="card-actions justify-end">
            <ButtonLesson id={id.toString()} lessonId={lessonId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
