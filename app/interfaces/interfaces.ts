export enum Role {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  DESIGNER = 'DESIGNER',
  TEAMLEADER = 'TEAMLEADER',
  MANAGER = 'MANAGER',
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roleId?: number;
  teamId?: string | null;
  email?: string;
  roles: Role[]; 
}

// export interface ITeamLeader {
//   id: string;
//   leader_id: string;
//   team_id?: string;
// }

export interface ITeamList {
  team_name: string;
}

export interface IUserWithTeam extends IUser {
  teams: ITeam[];
}
// export interface ITeamLeaderWithTeams extends ITeamLeader {
//   teams: ITeam[];
// }

export interface IAuth {
  email: string;
  password?: string;
}

export interface ITeam {
  id?: string;
  teamName: string;
  teamLeaderId?: string
  teamLeader: IUser ;
  participants: IUser[]; 
}

export interface ICourse {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  materials: string[];
  authorId: string;
}