"use client";

import { getTeam } from "@/app/(user_layout)/(admins)/manage_users/action";
import React, { FC, useEffect, useState } from "react";

interface UserProps {
  users: any;
}

const Users: FC<UserProps> = ({ users }) => {
  const [usersM, setUsersM] = useState<{ first_name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(users);
    setUsersM(users);

    const getUsersWithteam = async () => {
      const profilesWithTeams = await Promise.all(
        users.map(async (profile) => {
          const teams = await getTeam(profile.id);
          return { ...profile, teams };
        })
      );
      setUsersM(profilesWithTeams);
      console.log(profilesWithTeams);
    };
    getUsersWithteam();
  }, [users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = usersM?.filter((user) =>
    user?.first_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  console.log(filteredUsers);

  return (
    <div>
      <h1>Invite new users</h1>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-5 p-2 border border-gray-300 rounded"
      />
      {filteredUsers.map((user) => (
        <div key={user.id} className="flex">
          <div>{user.first_name}</div>
          <div>
            {" "}
            {user?.teams?.length > 0 ? (
              user.teams.map((team: any) => team.team_name).join(", ")
            ) : (
              <button>Invite user</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
