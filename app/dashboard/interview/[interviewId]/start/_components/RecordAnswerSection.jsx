"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import AudioAnalysis from "./AudioAnalysisModal "; // Import AudioAnalysis component
import ModelPrediction from "./ModelPrediction"; // Import webcam prediction component

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamPredictions, setWebcamPredictions] = useState(null);
  const [audioFeedback, setAudioFeedback] = useState(null);
  const [webcamFeedback, setWebcamFeedback] = useState(null);

  const {
    error,
    interimResult,
    isRecording: isRecordingSpeech,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecordingSpeech && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setIsRecording(false);
    } else {
      startSpeechToText();
      setIsRecording(true);
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer, "########");
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ",Depends on question and user answer for given interview question " +
      " please give use rating for answer and feedback as area of improvement if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
    console.log(
      "🚀 ~ file: RecordAnswerSection.jsx:38 ~ SaveUserAnswer ~ feedbackPrompt:",
      feedbackPrompt
    );
    const result = await chatSession.sendMessage(feedbackPrompt);
    console.log(
      "🚀 ~ file: RecordAnswerSection.jsx:46 ~ SaveUserAnswer ~ result:",
      result
    );
    const mockJsonResp = result.response
      .text()
      .replace("json", "")
      .replace("", "");

    console.log(
      "🚀 ~ file: RecordAnswerSection.jsx:47 ~ SaveUserAnswer ~ mockJsonResp:",
      mockJsonResp
    );
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

  const handleWebcamPredictions = (predictions) => {
    setWebcamPredictions(predictions);
    if (predictions.length > 0) {
      setWebcamFeedback(
        `Prediction: ${predictions[0].className}, Probability: ${(predictions[0].probability * 100).toFixed(2)}%`
      );
    }
  };

  const handleAudioFeedback = (predictions) => {
    if (predictions.length > 0) {
      setAudioFeedback(
        `Prediction: ${predictions[0].label} : ${predictions[0].score}%`
      );
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
        {/* Webcam component */}
        <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />
        {/* Webcam model prediction */}
        <ModelPrediction onPredictions={handleWebcamPredictions} />
      </div>
      <Button
        disabled={loading}
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

      {/* Real-time feedback section */}
      <div className="mt-10 p-4 border rounded-lg w-full max-w-2xl bg-white">
        <h3 className="text-lg font-semibold mb-2">Real-Time Feedback</h3>
        <div className="mb-4">
          <h4 className="font-medium">Audio Feedback:</h4>
          <p>{audioFeedback || "No audio feedback available."}</p>
        </div>
        <div>
          <h4 className="font-medium">Webcam Feedback:</h4>
          <p>{webcamFeedback || "No webcam feedback available."}</p>
        </div>
      </div>

      {/* Audio Analysis Component */}
      {isRecording && (
        <AudioAnalysis handleAudioFeedback={handleAudioFeedback} />
      )}
    </div>
  );
};

export default RecordAnswerSection;
