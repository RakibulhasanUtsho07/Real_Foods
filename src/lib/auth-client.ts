// src/lib/auth-client.ts বা lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient(); 
// baseURL না দিলে Next.js অটোমেটিক নিজের সমগোত্রীয় /api/auth রুট ব্যবহার করে।

export const { signIn, signUp, signOut, useSession } = authClient;