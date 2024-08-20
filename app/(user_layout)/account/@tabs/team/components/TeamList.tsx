import { ITeam, IUser } from '@/app/interfaces/interfaces';
import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface TeamCardProps {
  team: ITeam;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-4">
      {/* Team Name */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{team.teamName}</h2>
        <div className="flex gap-2">
          {/* Add Participant Button */}
          <button className="text-green-500 hover:text-green-700">
            <FaPlus size={16} />
          </button>
          {/* Edit Button */}
          <button className="text-blue-500 hover:text-blue-700">
            <FaEdit size={16} />
          </button>
          {/* Delete Button */}
          <button className="text-red-500 hover:text-red-700">
            <FaTrash size={16} />
          </button>
        </div>
      </div>

      {/* Team Leader Info */}
      <div className="flex items-center gap-4">
        <img
          src={team.teamLeader.avatarUrl}
          alt={`${team.teamLeader.firstName} ${team.teamLeader.lastName}`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            {team.teamLeader.firstName} {team.teamLeader.lastName}
          </h3>
          <p className="text-sm text-gray-500">{team.teamLeader.email}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">Participants: {team.participants.length}</p>
    </div>
  );
};

interface TeamsListProps {
  teams: ITeam[];
}

const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamsList;
