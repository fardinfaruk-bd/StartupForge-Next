const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return res.json();
}


export const serverMutation = async (path, data, method = 'POST') => {
    // Only attach a body if it's not a GET/DELETE and data actually exists
    const hasBody = data !== null && data !== undefined && method !== 'GET' && method !== 'DELETE';

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: hasBody ? JSON.stringify(data) : undefined, // Safely omit body
    });

    return res;
};