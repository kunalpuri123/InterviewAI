import { pgTable, serial, text, varchar, boolean, integer } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),
    resumeText: text('resumeText') 
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
});

export const UserProgress = pgTable('UserProgress', {
    id: serial('id').primaryKey(),
    userEmail: varchar('userEmail').notNull(), // Assuming you want to use email for identification
    chapterId: varchar('chapterId').notNull(), // To track each chapter
    isCompleted: boolean('isCompleted').default(false), // Track whether the chapter is marked as complete
    progressPercentage: integer('progressPercentage').default(0), // Track progress percentage (0-100)
  });

  export const UserPayment = pgTable('UserPayment', {
    id: serial('id').primaryKey(),
    userEmail: varchar('userEmail').notNull(),
    hasPaid: boolean('hasPaid').default(false), // Tracks if payment is done
    interviewCount: integer('interviewCount').default(0), // Number of interviews taken
    createdAt: varchar('createdAt'),
});
