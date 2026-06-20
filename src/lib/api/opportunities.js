import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getCompanyOpportunities = async (companyId, status) => {
    const res = await fetch(`${baseUrl}/api/opportunities?startupId=${companyId}&status=${status}`);
    return res.json();
}

export const getAllOpportunities = async () => {
    return serverFetch('/api/opportunities');
}

export const getOpportunityById = async (id) => {
    const res = await fetch(`${baseUrl}/api/opportunities/${id}`);
    return res.json();
}