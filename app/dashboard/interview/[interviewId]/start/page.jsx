"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false); // Track recording state

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  const handleNextQuestion = () => {
    if (isRecording) {
      alert("Please stop recording before moving to the next question.");
    } else {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setActiveQuestionIndex(activeQuestionIndex - 1);
  };

  const handleEndInterview = () => {
    if (isRecording) {
      alert("Please stop recording before ending the interview.");
    } else {
      // Navigate to feedback page
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video or audio recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
          setIsRecording={setIsRecording} // Pass setIsRecording to child component
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={handlePreviousQuestion}>Previous Question</Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={handleNextQuestion}
            disabled={isRecording} // Disable Next button during recording
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interViewData?.mockId}/feedback`}>
            <Button disabled={isRecording}>End Interview</Button> {/* Disable End Interview button during recording */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
