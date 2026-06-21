"use server";

import { serverMutation } from "../core/server";

export const ApplyApplication = async (data) => {
    return serverMutation("/api/applications", data);
};