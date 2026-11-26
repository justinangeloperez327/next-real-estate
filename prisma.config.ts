import { loadEnvFile } from "node:process";
import { defineConfig } from "prisma/config";

for (const file of [".env.local", ".env"]) {
  try {
    loadEnvFile(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

const url = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  ...(url ? { datasource: { url } } : {}),
});
