import { serverFetch } from "../core/server";

export const getApplicationByApplicantId = async (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`);
};

export const getApplicationByFounderId = async (founderId) => {
    return serverFetch(`/api/applications?founderId=${founderId}`);
};