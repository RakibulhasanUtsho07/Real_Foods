import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please add MONGO_URI to environment variables");
}

const client = new MongoClient(uri);
const db = client.db(process.env.DB_NAME || "real-foods");

// ডোমেইন ডাইনামিকলি ডিটেক্ট করার জন্য
const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

export const auth = betterAuth({
  // ডায়নামিকলি ওয়েবসাইট URL সেট হবে (Local/Vercel/Custom Domain)
  baseURL: getBaseUrl(),
  secret: process.env.BETTER_AUTH_SECRET,

  // প্রোডাকশন এবং লোকাল উভয় এনভায়রনমেন্টের জন্য Trusted Origins
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://real-foods.vercel.app", // আপনার Vercel বা লাইভ ডোমেইন
    process.env.BETTER_AUTH_URL || "",
  ].filter(Boolean),

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },
});