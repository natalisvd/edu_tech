"use client";

import { FC, useEffect, useState } from "react";
import detectRole from "./action";

interface ButtonProps {
  id: string;
}

const Button: FC<ButtonProps> = ({ id }) => {
  const [useRole, setUserRole] = useState();
  const userHandler = async () => {
    try {
      const result = await detectRole(id);
      setUserRole(result.role_id);
      console.log(result);
    } catch (error) {
      console.error("Error in userHandler:", error);
    }
  };
  useEffect(() => {
    userHandler();
  }, []);
  return (
    <div>
      {useRole !== 1 ? (
        <button type="button" className="btn" onClick={userHandler}>
          Make admin
        </button>
      ) : null}
    </div>
  );
};

export default Button;
