"use server"

import { serverMutation } from "../core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createOpportunity = async (newOpportunityData) => {
    return serverMutation('/api/opportunities', newOpportunityData);
}

export const updateOpportunity = async(updatedData, id)=> {
    // Added /api before /opportunities
    const res = await fetch(`${baseUrl}/api/opportunities/${id}`, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        }
    )
    
    if (!res.ok) {
        return { error: `Server error: ${res.status}` };
    }
    return res.json();
}