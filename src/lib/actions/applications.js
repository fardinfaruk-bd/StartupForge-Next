"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const ApplyApplication = async (data) => {
    return serverMutation("/api/applications", data);
};

export const updateApplicationStatus = async (id, data) => {
    const result = await serverMutation(`/api/applications/${id}`, data, 'PATCH');
    revalidatePath("/dashboard/founder/applications");
    return result;
}

