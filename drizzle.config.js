/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_pnM6g9JWTcGk@ep-holy-shadow-a8ui7uxf-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
        }
  };