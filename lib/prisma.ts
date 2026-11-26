import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

let db: PrismaClient | undefined;

export function getDb() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not configured");
    db = new PrismaClient({
      adapter: new PrismaPg({
        connectionString,
        max: 3,
        connectionTimeoutMillis: 5_000,
      }),
    });
  }
  return db;
}
