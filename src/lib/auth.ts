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
  advanced: {
    uri: "/api/auth",
  },

  trustedOrigins: [
    "http://localhost:3000",
  ],

  emailAndPassword: {
    enabled: true,
  },

  // ১. ইউজার স্কিমাতে রোল ফিল্ড যোগ করা (সঠিক key: additionalFields)
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // ফ্রন্টএন্ড থেকে ইউজার নিজে role পাঠিয়ে override করতে পারবে না
      },
    },
  },

  // ২. এখন এটা optional/redundant হয়ে গেছে যেহেতু defaultValue সেট করা আছে,
  //    তবে extra safety হিসেবে রাখা যায়
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.role || "user",
            },
          };
        },
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});

export type Auth = typeof auth;