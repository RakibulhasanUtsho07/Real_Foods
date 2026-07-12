import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient, Db } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri: string | undefined = process.env.MONGO_DB_URI;

if (!uri) {
  throw new Error("Please define the MONGO_DB_URI environment variable inside .env.local");
}

const client: MongoClient = new MongoClient(uri);
const db: Db = client.db("real-foods");

export const auth = betterAuth({
  // 👈 Better-Auth কে বলে দেওয়া হচ্ছে যে আপনি [...all] ব্যবহার করছেন
  advanced: {
    uri: "/api/auth",
  },

  trustedOrigins: [
    "http://localhost:3000",
  ],

  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});

export type Auth = typeof auth;