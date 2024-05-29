"use client";

import { FC } from "react";

interface LessonsProps {
  id: number;
  name: string;
  description: string;
  img: string;
}

const Lessons: FC<LessonsProps> = ({ id, name, description, img }) => {
  return (
    <div className="mb-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Lesson {id}</h2>
          <p>{name}</p>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
