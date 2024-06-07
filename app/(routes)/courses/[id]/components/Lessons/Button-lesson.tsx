// ButtonLesson.tsx

import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  id: string;
  lessonId: string;
}

const ButtonLesson: FC<Props> = ({ id, lessonId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${lessonId}/lesson/${id}`);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Open
    </button>
  );
};

export default ButtonLesson;
