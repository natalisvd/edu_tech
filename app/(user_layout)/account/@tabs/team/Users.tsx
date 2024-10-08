// @ts-nocheck
"use client";

import { getTeam, setUser, getTeamName, getUsersWithTeams } from "@/app/(user_layout)/(admins)/manage_users/action";
import { IUser, IUserWithTeam } from "@/app/interfaces/interfaces";
import React, { FC, useEffect, useState } from "react";

interface UserProps {
  users: IUserWithTeam[];
  teamId: string;
}

const Users: FC<UserProps> = ({ users, teamId }) => {
  const [usersM, setUsersM] = useState<IUserWithTeam[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [teamNames, setTeamNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const userIds = users.map(user => user.id);

    const getUsers = async () => {
      const usersWithTeams = await getUsersWithTeams(userIds);

      setUsersM(usersWithTeams);

      // Fetch team names
      const names: { [key: string]: string } = {};
      await Promise.all(
        usersWithTeams.flatMap((profile) =>
          profile?.teams?.map(async (team) => {
            names[team.team_id] = team.team_name;
          })
        )
      );

      setTeamNames(names);
    };

    getUsers();
  }, [users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = usersM?.filter((user) =>
    user?.first_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const setUserFunction = async (userId: any) => {
    try {
      const result = await setUser({ id: userId, teamId });
      console.log("User set successfully", result);
    } catch (error) {
      console.error("Failed to set user", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="tepxt-3xl font-bold mb-6">Invite new users</h1>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-5 p-2 w-full border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4  shadow rounded"
          >
            <div className="text-lg font-medium">{user.first_name}</div>
            <div className="flex items-center space-x-4">
              {user?.teams?.length > 0 ? (
                <div className="text-sm text-gray-600">
                  {user.teams
                    .map((team: any) => teamNames[team.team_id] || "Loading...")
                    .join(", ")}
                </div>
              ) : (
                <button
                  onClick={() => setUserFunction(user.id)}
                  className="btn"
                  // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Invite user
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
