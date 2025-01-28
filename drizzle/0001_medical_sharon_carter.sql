CREATE TABLE IF NOT EXISTS "UserProgress" (
	"id" serial PRIMARY KEY NOT NULL,
	"userEmail" varchar NOT NULL,
	"chapterId" varchar NOT NULL,
	"isCompleted" boolean DEFAULT false,
	"progressPercentage" integer DEFAULT 0
);
