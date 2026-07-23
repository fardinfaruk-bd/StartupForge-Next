import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const AuthHeader = async () => {
    const token = await getUserToken();
    const header = token ?{
        authorization: `Bearer ${token}`,
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return res.json();
}

export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await AuthHeader(),
    });
    return handleStatusCode(res);
}




export const serverMutation = async (path, data, method = 'POST') => {
    // Only attach a body if it's not a GET/DELETE and data actually exists
    const hasBody = data !== null && data !== undefined && method !== 'GET' && method !== 'DELETE';

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await AuthHeader(),
        },
        body: hasBody ? JSON.stringify(data) : undefined, // Safely omit body
    });
    
    return handleStatusCode(res);
};

const handleStatusCode = (res) =>{
    if(res.status === 401){
        redirect("/unauthorized");
    }else if(res.status === 403){
        redirect("/forbidden");
    }
    return res.json();
}