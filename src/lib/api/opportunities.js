import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getAllOpportunities = async (queryString) => {
  return serverFetch(`/api/opportunities?${queryString}`);
};


export const getOpportunityById = async (id) => {
  return protectedFetch(`/api/opportunities/${id}`);
};


export async function getOpenOpportunities( queryString ) {
  return serverFetch(`/api/open/opportunities?${queryString}`);
}

export const getOpportunity = async (id) => {
  return protectedFetch(`/api/my/opportunities?founderId=${id}`);
};

export const getStartupOpportunity = async (id) => {
  return protectedFetch(`/api/opportunities?startupId=${id}`);
};

