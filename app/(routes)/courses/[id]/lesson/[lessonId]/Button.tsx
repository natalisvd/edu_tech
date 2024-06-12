"use client";

import createNewLesson from "./action";

const Button = () => {
  const createNewTest = async () => {
    createNewLesson();
  };

  return (
    <div className="btn btn-primary" onClick={createNewTest}>
      buttons
    </div>
  );
};

export default Button;
