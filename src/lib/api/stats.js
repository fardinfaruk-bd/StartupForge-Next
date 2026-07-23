import { protectedFetch, serverFetch } from "../core/server";

export const loadFounderStats = async (role, userId) => {
  return protectedFetch(`/api/stats/founder?role=${role}&userId=${userId}`);
};

export const loadContributorStats = async (role, userId, email) => {
  return protectedFetch(`/api/stats/contributor?role=${role}&userId=${userId}&email=${email}`);
};

export const loadAdminStats = async (role) => {
  return protectedFetch(`/api/stats/admin?role=${role}`);
};


export const loadPublicStats = async () => {
  return serverFetch(`/api/stats/public`);
}