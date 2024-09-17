import { Lesson } from "../../Lesson";

interface Params {
    params: {
      id: string;
    };
  }
  
  export default function CurrentLessonPage({ params }: Params) {
    const { id } = params;
    // return <Lesson/>
    return <>{params.id}</>
  }