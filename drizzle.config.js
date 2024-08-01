/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:fk7iH4VosnGO@ep-ancient-term-a53lggmn.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };