import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Use NEXT_PUBLIC_ variable or fallback to window origin in browser
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || (typeof window !== "undefined" ? window.location.origin : ""),
})

// ✅ Export directly from the configured authClient instance
export const { signIn, signUp, useSession, signOut } = authClient;