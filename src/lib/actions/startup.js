'use server'


import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createStartup = async (newStartupData) => {
    return serverMutation('/api/startup', newStartupData);
}

export const updateStartup = async (newStartupData, _id) => {
  const res = await serverMutation(`/api/startup/${_id}`, newStartupData, 'PATCH');
  revalidatePath('/dashboard/founder/startup');
  return res;
};

export const updateStartupStatus = async (id, data) => {
  const result = await serverMutation(`/api/startup/status/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/startups");
  return result;
};

