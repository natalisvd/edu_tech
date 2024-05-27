import { createClient } from "@/utils/supabase/client";
import React from "react";
import Dialog from "./components/Dialog";

const CoursesModal = () => {
  const addNewCourse = async ({
    name,
    description,
    url,
  }: {
    name: string;
    description: string;
    url: string;
  }) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("courses")
      .insert([{ name, video_url: url, Description: description }])
      .select();

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_5") as HTMLDialogElement
          ).showModal()
        }
      >
        Add new courses
      </button>
      <Dialog addNewCourse={addNewCourse} />
    </div>
  );
};

export default CoursesModal;
