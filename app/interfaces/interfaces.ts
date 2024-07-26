//TODO
export interface ITeam {
    team_id: string;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string
  role_id?: number;
  team_id?: string;
}

export interface IUserWithTeam extends IUser {
  teams: ITeam[];
}
