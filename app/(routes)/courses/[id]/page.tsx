import { useParams, usePathname } from "next/navigation";
import { getCoursesById } from "../action";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Button from "../components/Button/button";
import Modal from "../components/Modal/Modal";
import CourseDetails from "./components/CourseDetails/CourseDetails";

const Page = async () => {
  const supabase = createClient();
  const heads = headers();
  const pathname = heads.get("x-pathname");
  console.log(pathname?.match(/\/courses\/(\d+)/));

  // const match = pathname?.match(/\/courses\/(\d+)/);
  // const courseId = match ? match[1] : null;
  // console.log(courseId);
  // const params = useParams<{
  //   [x: string]: any;
  //   tag: string;
  //   item: string;
  // }>();
  // console.log(pathname);
  // console.log(params.id);
  // getCoursesById(params.id);

  // const updateColumn = async () => {
  //   const { data, error } = await supabase
  //     .from("courses")
  //     .update({ other_column: "otherValue" })
  //     .eq("some_column", "someValue")
  //     .select();
  // };

  let { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", 1);
  // @ts-ignore

  if (course && course.length > 0) {
    console.log(course[0]);
    console.log("questions", course[0]);
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="flex lg:flex-row-reverse">
          <embed
            width="600"
            height="400"
            src={course[0].video_url}
            allowFullScreen
          ></embed>
          <CourseDetails course={course} />
        </div>
      </div>
    );
  } else {
    console.log("Course not found");
    return <div>Course not found</div>;
  }
};

export default Page;
