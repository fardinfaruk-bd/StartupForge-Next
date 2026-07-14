import { serverFetch } from "../core/server"

export const getAllUsers = async () => {
    return serverFetch("/api/users")
}