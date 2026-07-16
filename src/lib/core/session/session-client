import { headers } from "next/headers";
import { authClient } from "../../auth-client";

export const getSessionData = async () => {
  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    return session?.user ?? null;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};