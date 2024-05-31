// ButtonLesson.tsx

import { useRouter } from "next/navigation";

const ButtonLesson = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lessons/${1}`);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Listen
    </button>
  );
};

export default ButtonLesson;
