"use client";

import createNewLesson from "../action";
import ModalWindow from "./ModalWindow/ModalWindow";

export const CTAButton = () => {
  const handleClick = async () => {
    console.log("click CTAbutton");
    try {
      const result = await createNewLesson();
      console.log("result", result);
      window.location.reload();
    } catch (error) {
      console.log("CTAbutton [error]", error);
    }
  };

  return (
    <>
      {" "}
      <ModalWindow>
        {" "}
        <button className="btn btn-primary" onClick={handleClick}>
          Create new lesson
        </button>
      </ModalWindow>
    </>
  );
};
