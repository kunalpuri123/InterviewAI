/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:A4ecjwLtKd7Z@ep-sweet-cake-a5baaa18.us-east-2.aws.neon.tech/neondb?sslmode=require'
        }
  };