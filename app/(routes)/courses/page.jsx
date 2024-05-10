import React from "react";
import Data from "./data";
import Card from "./Card";
import Select from "../../components/Select/Select";
import { createClient } from "@/utils/supabase/server";

const Courses = async () => {
  const supabase = createClient();
  let { data: courses, error } = await supabase.from("courses").select("*");
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center">
        <div className="max-w w-full ">
          <div>{/* <Data /> */}</div>
          <div className="mb-10"> Frontend & Fullstack Engineering Courses</div>

          <input
            type="text"
            placeholder="Search for Courses"
            className="input input-bordered w-full max-w"
          />
          <Select />
          <div className="flex flex-wrap justify-center">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
