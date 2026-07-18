"use server";
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

export const getFeaturedStartups = async () => {
  return serverFetch(`/api/startups/featured`);
}

export const getFounder = async (founderId) => {
  return serverFetch(`/api/users/${founderId}`);
}

export const getAllStartups = async (queryString) => {
  return serverFetch(`/api/startups?${queryString}`);
};
