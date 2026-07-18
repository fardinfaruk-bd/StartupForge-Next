"use server";

import { serverMutation } from "../core/server";

export const createOpportunity = async (newOpportunityData) => {
  return serverMutation("/api/opportunities", newOpportunityData);
};

export const updateOpportunity = async (id, updatedData) => {
  try {
    const res = await serverMutation(
      `/api/opportunities/${id}`,
      updatedData,
      "PATCH",
    );
    if (!res.ok) {
      return { error: `Server error: ${res.status}` };
    }

    return await res.json();
  } catch (err) {
    return { error: "Network error or failed to parse response." };
  }
};

export const deleteOpportunity = async (id) => {
  try {
    const result = await serverMutation(`/api/opportunities/${id}`, null, "DELETE");
    if (result && result.deletedCount > 0) {
      return { success: true };
    }

    return { error: "Opportunity not found or already deleted." };
  } catch (err) {
    return { error: "Something went wrong during deletion." };
  }
};
