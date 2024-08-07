//TODO
export interface ITeam {
  id: string;
  team_id: string;
  user_id: string;
}

export interface IUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role_id?: number;
  team_id?: string;
}

export interface ITeamLeader {
  id: string;
  leader_id: string;
  team_id?: string;
}

export interface ITeamList {
  team_name: string;
}

export interface IUserWithTeam extends IUser {
  teams: ITeam[];
}
export interface ITeamLeaderWithTeams extends ITeamLeader {
  teams: ITeam[];
}


export interface IAuth {
  email: string;
  password?: string;
}