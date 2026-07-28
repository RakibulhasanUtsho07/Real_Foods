import { headers } from "next/headers";
import { authClient } from "../../auth-client"; // অথবা আপনার auth (server instance)

export const getSessionServerData = async () => {
  try {
    const reqHeaders = await headers();
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: reqHeaders,
      },
    });

    return session?.user ?? null;
  } catch (error) {
    console.error("Error fetching server session:", error);
    return null;
  }
};