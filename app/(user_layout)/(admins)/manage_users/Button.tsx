"use client";

import { FC, useEffect, useState } from "react";
import { detectRole, setRole, getTeam } from "./action";

interface ButtonProps {
  id: string;
}

const Button: FC<ButtonProps> = ({ id }) => {
  const [useRole, setUserRole] = useState<number | null>(null);
  const [hasRun, setHasRun] = useState(false); // Додаємо стан для відстеження

  const userHandler = async () => {
    try {
      const result = await detectRole(id);
      setUserRole(result.role_id);
    } catch (error) {
      console.error("Error in userHandler:", error);
    }
  };

  const setRoleHandler = async () => {
    try {
      await setRole(id);
      setUserRole(null); // Assuming role_id 1 means admin role
    } catch (error) {
      console.error("Error in setRoleHandler:", error);
    }
  };

  useEffect(() => {
    if (!hasRun) {
      // Перевірка чи функція вже виконувалася
      userHandler();
      setHasRun(true); // Оновлюємо стан
    }
  }, [hasRun]); // Додаємо залежність hasRun

  return (
    <div>
      {useRole !== 1 ? (
        <button
          onClick={setRoleHandler}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Assign Admin Role
        </button>
      ) : null}
    </div>
  );
};

export default Button;
