"use server";
import { revalidatePath } from "next/cache";
import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getFounderStartup = async (founderId) => {
  return serverFetch(`/api/my/startup?founderId=${founderId}`);
};
export const loggedInFounderStartup = async () => {
  const user = await getUserSession();
  return getFounderStartup(user?.id);
};

export const getActiveAllStartups = async () => {
  return serverFetch(`/api/startups`);
};


