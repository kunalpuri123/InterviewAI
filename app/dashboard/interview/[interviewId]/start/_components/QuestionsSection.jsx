"use client";
import { useEffect, useState } from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [isMounted, setIsMounted] = useState(false);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };

  // Monitor changes to active question and route (using location or state)
  useEffect(() => {
    setIsMounted(true);

    // Read the question if it's the first mount or when active question changes
    if (mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex]) {
      textToSpeech(mockInterviewQuestion[activeQuestionIndex].question);
    }

    return () => {
      // Clean up: Cancel ongoing speech when the component is unmounted or active question changes
      window.speechSynthesis.cancel();
    };
  }, [activeQuestionIndex, mockInterviewQuestion]);

  useEffect(() => {
    // Monitor changes in the route or if the interview is finished
    const handleRouteChange = () => {
      // Stop speech synthesis if route changes or interview finishes
      window.speechSynthesis.cancel();
    };

    window.addEventListener('beforeunload', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, []);

  if (!isMounted) return null; // Prevent rendering before the component is mounted

  return (
    mockInterviewQuestion && (
      <div className="questions-section p-5 border rounded-lg my-10 bg-gray-900 text-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`question-label p-2 border-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index
                  ? 'active' // Active question style
                  : 'inactive' // Inactive question style
              }`}
              onClick={() => {/* Function to set active question */}}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer text-white"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className="border rounded-lg p-5 bg-gray-800 mt-20">
          <h2 className="flex gap-2 items-center text-white">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-gray-400 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
