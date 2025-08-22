// Load environment variables

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-08-22";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qb0bpumz";
