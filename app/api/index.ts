import { IAuth } from "../interfaces/interfaces";
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

export const currentUser = () => post("/user/currentUser");
export const updateUser = (formData: any) =>
  patch("/user/currentUser", formData);

// /* users requests */
export const getAllUsers = () => get("/user");