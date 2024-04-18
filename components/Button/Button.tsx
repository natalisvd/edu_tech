"use client";

import { supabaseAdmin } from "@/lib/supabase";

const setNewView = async () => {
  console.log("hi");
  const { data, error } = await supabaseAdmin.from("views").insert({
    name: "random name",
  });
  console.log("data", data);
  if (data) console.log(data);
  if (error) console.log(error);
};

const handleclick = () => {
  setNewView();
};

const Button: React.FC<any> = ({ onClick }) => {
  return <button onClick={handleclick}>Button</button>;
};

export default Button;
