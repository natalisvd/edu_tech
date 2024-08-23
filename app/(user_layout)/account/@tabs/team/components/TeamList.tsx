import { getAvatarUrl } from "@/app/helpers/image.helper";
import { useUser } from "@/app/hooks/auth.hook";
import { ITeam } from "@/app/interfaces/interfaces";
import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/app/store/slices/userSlice";
import Image from "next/image";
import React from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface TeamCardProps {
  team: ITeam;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const { teamLeaderId } = team;
  const user = useUser();
  const isYourTeam = user ? teamLeaderId === user.id : false;

  return (
    <div className="bg-gray-100 border border-gray-300 shadow-md rounded-lg p-4 mb-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">{team.teamName}</h2>
        {isYourTeam && (
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-700">
              <FaPlus size={16} />
            </button>
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit size={16} />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrash size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={getAvatarUrl(team.teamLeader.avatarUrl)}
          alt="avatar"
          width={114}
          height={114}
          priority
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {team.teamLeader.firstName} {team.teamLeader.lastName}
          </h3>
          <p className="text-sm text-gray-600">{team.teamLeader.email}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700">
        Participants: {team.participants.length}
      </p>
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
