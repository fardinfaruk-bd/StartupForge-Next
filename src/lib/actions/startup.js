'use server'

import { serverMutation } from "../core/server";

export const createStartup = async (newStartupData) => {
    return serverMutation('/api/startup', newStartupData);
}