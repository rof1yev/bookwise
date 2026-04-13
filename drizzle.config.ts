import "dotenv/config";
import { Config, defineConfig } from "drizzle-kit";
import config from "./lib/config";

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.env.databaseUrl!,
  },
}) satisfies Config;
