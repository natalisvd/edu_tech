import { boolean } from "yup";
import { IAuth, ICourse, ICourseWithAuthor, ITeam, IUser } from "../interfaces/interfaces";
import { get, post, patch, httpDelete } from "./axios";

export const login = (body: IAuth) =>
  post("/auth/login", body).then((res: any) => {
    localStorage.setItem("token", res.accessToken);
    return res;
  });
export const register = (body: IAuth) =>
  post("/auth/register", body).then((res: any) => {
    localStorage.setItem("token", res.accessToken);
    return res;
  });

// /* users requests */
export const currentUser = () => post("/user/currentUser");
export const updateUser = (formData: any) =>
  patch("/user/currentUser", formData);
export const getAllUsers = () => get("/user");
export const getAllTeamLeaders = ({ withTeam }: { withTeam: boolean }) =>
  get(`/user/teamleaders/${withTeam}`);
export const getAllWorkers = () => get(`/user/workers`);
export const updateUserMultiple = (body: IUser[]) =>
  patch("/user/updateUserMultiple", body);

// /* teams requests */
export const getAllTeams = () => get("/team");
export const createTeamApi = (body: ITeam) => post("/team", body);

// /* courses requests */
export const createCourseApi = (body: ICourse) => post("/courses", body);
export const updateCourseApi = (body: ICourse) =>
  patch(`/courses/${body.id}`, body);
export const getCourseByIdApi = (courseId: string): Promise<ICourse> =>
  get(`/courses/${courseId}`);
export const getAllCourseApi = (): Promise<ICourseWithAuthor[]> => get(`/courses`);
export const deleteCourseApi =(id:string)=> httpDelete(`/courses/${id}`)