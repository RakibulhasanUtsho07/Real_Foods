import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
        return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
    }
    if (typeof window !== "undefined") {
        return window.location.origin; 
    }
    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl(),
    // 👈 ফ্রন্টএন্ড ক্লায়েন্টকেও একই কাস্টম পাথ রিড করতে বলা হচ্ছে
    advanced: {
        uri: "/api/auth"
    }
});

export const { signIn, signUp, signOut, useSession } = authClient;