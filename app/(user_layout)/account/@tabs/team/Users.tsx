"use client";

import React, { FC, useEffect, useState } from "react";

interface UserProps {
  users: { first_name: string }[];
}

const Users: FC<UserProps> = ({ users }) => {
  const [usersM, setUsersM] = useState<{ first_name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(users);
    setUsersM(users);
  }, [users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = usersM?.filter((user) =>
    user?.first_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-5 p-2 border border-gray-300 rounded"
      />
      {filteredUsers.map((user) => (
        <div key={user.first_name}>{user.first_name}</div>
      ))}
    </div>
  );
};

export default Users;
