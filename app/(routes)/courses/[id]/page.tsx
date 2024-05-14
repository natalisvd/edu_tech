import { useParams, usePathname } from "next/navigation";
import { getCoursesById } from "../action";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

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
  let { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", 1);
  // @ts-ignore

  console.log(course[0].Description);
  if (course && course.length > 0) {
    console.log(course[0].Description);
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold"> Title</h1>
            <p className="py-6">{course[0].Description}</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    );
  } else {
    console.log("Course not found");
    return <div>Course not found</div>;
  }
};

export default Page;
