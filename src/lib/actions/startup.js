'use server'

import { serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createStartup = async (newStartupData) => {
    return serverMutation('/api/startup', newStartupData);
}

export const updateStartup = async (newStartupData, _id) => {

  const res = await fetch(`${baseUrl}/api/startup/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStartupData),
  });

  if (!res.ok) {
    return { error: `Server error: ${res.status}` };
  }
  
  return res.json();
};