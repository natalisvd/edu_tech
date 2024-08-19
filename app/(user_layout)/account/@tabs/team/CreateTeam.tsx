"use client";

import { FC, useCallback, useEffect } from "react";
import { createTeam } from "@/app/(user_layout)/(admins)/manage_users/action";
import Modal from "./components/ModalOld";

interface CreateTeamProps {
  teamName?: any;
  id: string;
}

const CreateTeam: FC<CreateTeamProps> = ({ teamName, id }) => {
  return (
    <div>
      <Modal teamName={teamName} id={id} />
    </div>
  );
};

export default CreateTeam;
