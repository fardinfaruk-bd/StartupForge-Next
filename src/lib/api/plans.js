import { protectedFetch, serverFetch } from "../core/server";

export const getPlanById = async (planId) => {
    return protectedFetch(`/api/plans?plan_id=${planId}`);
};