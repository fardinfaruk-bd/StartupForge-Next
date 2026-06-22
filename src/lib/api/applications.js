import { serverFetch } from "../core/server";

export const getApplicationByApplicantId = async (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`);
};