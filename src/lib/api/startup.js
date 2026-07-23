"use server";
import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getFounderStartup = async (founderId) => {
  return protectedFetch(`/api/my/startup?founderId=${founderId}`);
};
export const loggedInFounderStartup = async () => {
  const user = await getUserSession();
  return getFounderStartup(user?.id);
};

export const getActiveAllStartups = async () => {
  return protectedFetch(`/api/startups`);
};

export const getFeaturedStartups = async () => {
  return serverFetch(`/api/featured/startups`);
}

export const getFounder = async (founderId) => {
  return serverFetch(`/api/users/${founderId}`);
}

export const getAllStartups = async (queryString) => {
  return serverFetch(`/api/startups?${queryString}`);
};
export const getStartupById = async (id) => {
  return protectedFetch(`/api/startups/${id}`);
};
