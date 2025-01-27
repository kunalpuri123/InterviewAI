"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="relative my-10 p-5">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black-500 via-grey-500 to-black-500 opacity-70 rounded-lg"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <h2 className="font-bold text-2xl text-center mb-8 text-white">
          Let's Get Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Interview Info */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col p-5 rounded-lg border border-gray-700 bg-gray-800 text-white gap-5">
              <h2 className="text-lg">
                <strong>Job Role/Job Position: </strong>
                {interviewData?.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack: </strong>
                {interviewData?.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience: </strong>
                {interviewData?.jobExperience}
              </h2>
            </div>

            {/* Information Box */}
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 text-gray-800">
              <h2 className="flex gap-2 items-center text-yellow-500">
                <Lightbulb />
                <span>Information</span>
              </h2>
              <h2 className="mt-3 text-yellow-500">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </h2>
            </div>
          </div>

          {/* Webcam Section */}
          <div className="flex flex-col items-center justify-center gap-4">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: "8px",
                  border: "2px solid #4B5563", // Gray border to match the theme
                }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 my-7 border rounded-lg w-full p-20 bg-gray-600 text-white" />
                <Button
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                  variant="ghost"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Start Interview Button */}
        <div className="flex justify-end mt-8">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;
