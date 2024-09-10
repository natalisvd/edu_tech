import { getFullUrl } from "@/app/helpers/image.helper";
import { useUser } from "@/app/hooks/auth.hook";
import { ITeam, IUser } from "@/app/interfaces/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateParticipantsModal from "./UpdateParticipantsModal";

interface TeamCardProps {
  team: ITeam;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const { teamLeaderId } = team;
  const user = useUser();
  const isYourTeam = user ? teamLeaderId === user.id : false;
  const [participants, setParticipants] = useState(team.participants);

  const handleUpdateParticipants = (selectedWorkersList: IUser[]) => {
    setParticipants(selectedWorkersList);
  };

  return (
    <div className="bg-gray-100 border border-gray-300 shadow-md rounded-lg p-4 mb-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">{team.teamName}</h2>
        {isYourTeam && (
          <button className="text-red-500 hover:text-red-700">
            <FaTrash size={16} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={getFullUrl(team.teamLeader.avatarUrl)}
          alt="avatar"
          width={114}
          height={114}
          priority
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {team.teamLeader.firstName} {team.teamLeader.lastName}
          </h3>
          <p className="text-sm text-gray-600">{team.teamLeader.email}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-700">Participants</p>
          <div className="flex flex-wrap gap-2">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative"
                title={`${participant.firstName} ${participant.lastName}`}
              >
                <Image
                  src={getFullUrl(participant.avatarUrl)}
                  alt="participant avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
        {isYourTeam && (
          <UpdateParticipantsModal
            updateParticipants={handleUpdateParticipants}
            teamId={team.id + ""}
          />
        )}
      </div>
    </div>
  );
};

interface TeamsListProps {
  teams: ITeam[];
}

const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div className="space-y-4 mt-5">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamsList;
