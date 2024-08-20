"use client";
import { getAllTeamLeaders, getAllTeams } from "@/app/api";
import { ITeam, IUser } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react";
import { CreateTeamModal } from "./components/CreateTeamModal";
import TeamsList from "./components/TeamList";

export default function Page() {
  const [teamLeaders, setTeamLeaders] = useState<IUser[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);

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

  const updateTeamleadersList = (teamLeaderId: string, newTeam: ITeam) => {
    const newList = teamLeaders.filter(
      (teamLeader) => teamLeader.id !== teamLeaderId
    );
    setTeamLeaders(newList);
    setTeams([...teams, newTeam]);
  };
  return (
    <div className="p-4">
      {teamLeaders.length > 0 ? (
        <CreateTeamModal
          teamLeaders={teamLeaders}
          updateTeamleadersList={updateTeamleadersList}
        />
      ) : (
        <p>No available team leaders</p>
      )}

      {teams.length > 0 ? <TeamsList teams={teams} /> : <p className="mt-5">No teams yet</p>}
    </div>
  );
}
