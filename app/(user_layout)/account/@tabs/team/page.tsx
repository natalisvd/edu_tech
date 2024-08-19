"use client";
import { getAllTeamLeaders } from "@/app/api";
import { IUser } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react";

export default function Page() {
  const [teamLeaders, setTeamLeaders] = useState<IUser[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const teamleaders = (await getAllTeamLeaders()) as IUser[];
      setTeamLeaders(teamleaders);
      console.log(teamleaders);
    } catch (error) {
      console.error("Error fetching team leaders:", error);
    }
  };

  return <div>page</div>;
}
