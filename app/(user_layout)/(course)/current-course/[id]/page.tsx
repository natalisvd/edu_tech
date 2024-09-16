import { CurrentCourse } from "../../CurrentCourse";

interface Params {
  params: {
    id: string;
  };
}

export default function CurrentCoursePage({ params }: Params) {
  const { id } = params;
  return <CurrentCourse courseId={id} />;
}
