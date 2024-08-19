"use client";
import { getAllTeamLeaders, getAllTeams } from "@/app/api";
import { ITeam, IUser } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react";
import { CreateTeamModal } from "./components/CreateTeamModal";

export default function Page() {
  const [teamLeaders, setTeamLeaders] = useState<IUser[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const respTeamleaders = (await getAllTeamLeaders({
        withTeam: false,
      })) as IUser[];
      setTeamLeaders(respTeamleaders);

      const respTeams = (await getAllTeams()) as ITeam[];
      setTeams(respTeams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-4">
      {teamLeaders.length > 0 ? (
        <CreateTeamModal teamLeaders={teamLeaders} />
      ) : (
        <p>No available team leaders</p>
      )}
    </div>
  );
}
