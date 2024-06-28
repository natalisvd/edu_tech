"use client";

import { FC, useCallback } from "react";
import { createTeam } from "@/app/(user_layout)/(admins)/manage_users/action";

interface CreateTeamProps {
  teamName?: string;
}

const CreateTeam: FC<CreateTeamProps> = ({ teamName }) => {
  const handleCreateTeam = useCallback(async () => {
    try {
      await createTeam(teamName);
      console.log("Team created successfully.");
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  }, [teamName]);

  return (
    <div>
      <h2>Create Team</h2>
      <button onClick={handleCreateTeam}>Create Team</button>
    </div>
  );
};

export default CreateTeam;
