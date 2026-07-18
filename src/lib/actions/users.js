"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export async function updateUserRoleStatus(id, data) {
  const result = await serverMutation(`/api/users/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/users");
  return result;
}
