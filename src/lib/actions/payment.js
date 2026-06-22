"use server";

import { serverMutation } from "../core/server";

export const createPayment = async (paymentInfo) => {
    return serverMutation("/api/payment", paymentInfo);
};