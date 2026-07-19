import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getAllOpportunities = async (queryString) => {
  return serverFetch(`/api/opportunities?${queryString}`);
};


export const getOpportunityById = async (id) => {
  const res = await fetch(`${baseUrl}/api/opportunities/${id}`);
  return res.json();
};


export async function getOpenOpportunities( queryString ) {
  return serverFetch(`/api/open/opportunities?${queryString}`);
}

export const getOpportunity = async (id) => {
  return serverFetch(`/api/my/opportunities?founderId=${id}`);
};

export const getStartupOpportunity = async (id) => {
  return serverFetch(`/api/opportunities?startupId=${id}`);
};

