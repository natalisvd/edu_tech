"use client";

import { FC, useCallback } from "react";
import { createTeam } from "@/app/(user_layout)/(admins)/manage_users/action";
import Modal from "./components/Modal";

interface CreateTeamProps {
  teamName?: string;
  id: string;
}

const CreateTeam: FC<CreateTeamProps> = ({ teamName, id }) => {
  return (
    <div>
      {teamName?.length > 2 ? teamName : <Modal teamName={teamName} id={id} />}
    </div>
  );
};

export default CreateTeam;
