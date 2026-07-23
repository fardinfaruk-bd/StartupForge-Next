import { protectedFetch } from "../core/server";


export const getAllUsers = async () => {
  return protectedFetch("/api/users");
};
