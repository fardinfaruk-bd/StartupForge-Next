import { serverFetch } from "../core/server";

export const getAllTransactions = async () => {
    return serverFetch("/api/payment");
}