'use server'

import { serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createStartup = async (newStartupData) => {
    return serverMutation('/api/startup', newStartupData);
}

export const updateStartup = async (newStartupData, _id) => {

  const res = await serverMutation(`/api/startup/${_id}`, newStartupData, 'PATCH');

  if (!res.ok) {
    return { error: `Server error: ${res.status}` };
  }
  
  return res.json();
};