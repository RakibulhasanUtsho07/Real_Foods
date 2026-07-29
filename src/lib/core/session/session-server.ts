import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getSessionServerData = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user ?? null;
  } catch (error) {
    console.error("Error fetching server session:", error);
    return null;
  }
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token;
};