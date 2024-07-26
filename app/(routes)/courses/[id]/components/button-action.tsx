"use client";

import createNewLesson from "../action";
import ModalWindow from "./ModalWindow/ModalWindow";

interface CTAButtonProps {
  id: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ id }) => {
  const handleClick = async () => {
    console.log("click CTAbutton", id);
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
      <ModalWindow id={id}/>
    </>
  );
};
