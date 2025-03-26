CREATE TABLE IF NOT EXISTS "UserPayment" (
	"id" serial PRIMARY KEY NOT NULL,
	"userEmail" varchar NOT NULL,
	"hasPaid" boolean DEFAULT false,
	"interviewCount" integer DEFAULT 0,
	"createdAt" varchar
);
