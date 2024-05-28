"use client";

import React, { FC } from "react";

interface ButtonProps {
  handleChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

const Button: FC<ButtonProps> = ({ handleChange, text }) => {
  return (
    <button className="btn" onClick={handleChange}>
      {text}
    </button>
  );
};

export default Button;
