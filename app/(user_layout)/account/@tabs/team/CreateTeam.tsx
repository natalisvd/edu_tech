"use client";

import { FC, useCallback } from "react";
import { createTeam } from "@/app/(user_layout)/(admins)/manage_users/action";

interface CreateTeamProps {
  teamName?: string;
  id: string;
}

const CreateTeam: FC<CreateTeamProps> = ({ teamName, id }) => {
  const handleCreateTeam = useCallback(async () => {
    try {
      await createTeam(teamName, id);
      console.log("Team created successfully.");
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  }, [teamName]);

  return (
    <div>
      <button onClick={handleCreateTeam}>Create Team</button>
    </div>
  );
};

export default CreateTeam;
