import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  // Add this configuration block:
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true, 
                defaultValue: "contributor",
            },
            plan: {
                default: "founder_free"
            },
            status: {
                default: "active"
            }
        }
    },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
