import Course from "../../Course";

interface Params {
  params: {
    id: string;
  };
}

export default function UpdateCourse({ params }: Params) {
  const { id } = params;
  return <Course courseId={id} />;
}