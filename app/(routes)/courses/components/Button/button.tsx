"use client";
import { FC } from "react";

interface ButtonProps {
  description: string;
  oldDescription: string;
  updateColumn: any;
}

const Button: FC<ButtonProps> = ({
  description,
  oldDescription,
  updateColumn,
}) => {
  console.log("descriptionprops", description);
  return (
    <button
      className="btn btn-success"
      onClick={() => updateColumn(description, oldDescription)}
    >
      Save
    </button>
  );
};

export default Button;
