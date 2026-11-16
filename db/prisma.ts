import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Configure a valid PostgreSQL connection string.");
}

let databaseUrl: URL;
try {
  databaseUrl = new URL(connectionString);
} catch {
  throw new Error("DATABASE_URL is invalid. Configure a valid PostgreSQL connection string.");
}

if (
  !["postgres:", "postgresql:"].includes(databaseUrl.protocol) ||
  !databaseUrl.hostname
) {
  throw new Error("DATABASE_URL must be a valid PostgreSQL connection string.");
}

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
// const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon({ connectionString });

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
const prisma = new PrismaClient({ adapter });

export default prisma;
