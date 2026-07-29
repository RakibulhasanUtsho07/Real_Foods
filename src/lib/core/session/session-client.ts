import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

 // ⚠️ path আপনার প্রজেক্ট অনুযায়ী চেক করুন — এটা "server" auth instance, authClient না

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

