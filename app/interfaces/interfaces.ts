//TODO
export interface ITeam {
    team_id: string;
}

export interface IUser {
  id: string;
  first_name: string;
}

export interface IUserWithTeam extends IUser {
  teams: ITeam[];
}
