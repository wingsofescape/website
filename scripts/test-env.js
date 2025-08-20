// Test script to verify environment variables are working
import "dotenv/config";

console.log("=== Environment Variables Test ===");
console.log("Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log("API Version:", process.env.NEXT_PUBLIC_SANITY_API_VERSION);
console.log("=====================================");

// Check if all required variables are present
const requiredVars = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
];

const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length === 0) {
  console.log("✅ All Sanity environment variables are loaded correctly!");
} else {
  console.log("❌ Missing environment variables:", missingVars);
}
