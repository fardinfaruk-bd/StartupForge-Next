"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createOpportunity = async (newOpportunityData) => {
    const res = await fetch(`${baseUrl}/api/opportunities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOpportunityData)
    })
    return res.json();
}