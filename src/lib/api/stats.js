import { serverFetch } from "../core/server";

export const loadFounderStats = async (role, userId) => {
  return serverFetch(`/api/states?role=${role}&userId=${userId}`);
};

export const loadContributorStats = async (role, userId, email) => {
  return serverFetch(`/api/states?role=${role}&userId=${userId}&email=${email}`);
};

export const loadAdminStats = async (role) => {
  return serverFetch(`/api/states?role=${role}`);
};


export const loadPublicStats = async () => {
  return serverFetch(`/api/stats/public`);
}