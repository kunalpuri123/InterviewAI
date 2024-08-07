"use client";

import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import ModelPrediction from "./ModelPrediction";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);
  const [modelFeedback, setModelFeedback] = useState([]);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const audioRef = useRef(null);

  useEffect(() => {
    results.forEach((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  useEffect(() => {
    if (mockInterviewQuestion?.[activeQuestionIndex]?.audio) {
      setIsPlayingQuestion(true);
      audioRef.current?.play();
    }
  }, [activeQuestionIndex, mockInterviewQuestion]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setIsPlayingQuestion(false);
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    if (!mockInterviewQuestion?.[activeQuestionIndex]) {
      console.error("Question data is not available.");
      return;
    }

    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for given interview question " +
      "please give a rating for the answer and feedback as area of improvement if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonfeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonfeedbackResp?.feedback,
      rating: JsonfeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  const handleModelPredictions = (predictions) => {
    setModelFeedback(predictions.map(prediction => ({
      className: prediction.className,
      probability: parseFloat(prediction.probability).toFixed(2), // Ensure probability is a number
    })));
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex justify-center items-center flex-col">
      <audio
        ref={audioRef}
        src={
          mockInterviewQuestion?.[activeQuestionIndex]?.audio
            ? `url/to/your/question/audio/file/${mockInterviewQuestion[activeQuestionIndex]?.audio}`
            : null
        }
        onEnded={() => setIsPlayingQuestion(false)}
      />

      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Webcam
          audio={false}
          videoConstraints={{ facingMode: "user" }}
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />

        <ModelPrediction onPredictions={handleModelPredictions} />
      </div>

      <Button
        disabled={loading || isPlayingQuestion}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      <div className="mt-5">
        <h3 className="text-lg font-semibold">Real-time Feedback:</h3>
        {modelFeedback.map((item, index) => (
          <p key={index}>
            {item.className}: {item.probability}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RecordAnswerSection;
