"use client";

import React, { useState, useEffect, useRef } from "react";
import { createChatSession } from "@/utils/GeminiAIModal";
import { speakText } from "@/utils/speech";
import { LoaderCircle } from "lucide-react";

function QuestionSection() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [chatSession, setChatSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingNextQuestion, setLoadingNextQuestion] = useState(false);
  const [userName, setUserName] = useState("");
  const [userIntroduced, setUserIntroduced] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(30 * 60); // Initial time in seconds
  const [endTime, setEndTime] = useState(null);
  const [interviewEnded, setInterviewEnded] = useState(false);

  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [interviewStage, setInterviewStage] = useState("introduction");

  const dummyResume = `Kunal Pradeep Puri
Software Developer (Full Stack)
https://github.com/kunalpuri123 https://linkedin.com/in/kunalpuri1 kunalpuri.scoe.it@gmail.com
+919767657440 https://www.kunalpuri.in.net
Professional Summary
Entry level Full Stack Developer with a solid foundation in JavaScript, TypeScript, and React, complemented by hands-on
experience in building dynamic web applications. Successfully developed and deployed multiple projects
utilizing Node.js and Express.js, enhancing user engagement by 30%. Proficient in leveraging AWS services and containerization
tools like Docker and Kubernetes for scalable solutions. Adept at collaborating within agile teams, employing CI/CD practices to
streamline development processes. Committed to continuous learning and innovation, eager to contribute to impactful projects in
a fast-paced environment.
Skills
Languages: C/C++, JavaScript, TypeScript, SQL, HTML, CSS
Databases: MongoDB, PostgreSQL, MySQL
Frameworks: React.js, Express.js, Node.js, Next.js, Tailwind CSS, Redux, GraphQL
Technologies & Tools: AWS (S3, Lambda, DynamoDB), Docker, Kubernetes, CI/CD (CircleCI, GitLab CI/CD), Git, GitHub, Jest,
Cypress, React Testing Library, Postman, WebSockets, Socket.io, Figma
Work Experience
EXTION INFOTECH PVT LTD
Software Development Engineer Nov 2023 – Dec 2023
• Developed interactive websites using JavaScript, HTML, and CSS, elevating user engagement by 30% through intuitive design
and functionality.
• Collaborated on the development of dynamic web applications with React.js and Node.js, achieving a 25% increase in user
satisfaction and interaction rates.
• Devised and executed a mobile optimization strategy by integrating responsive design principles, which improved page
load times by 3 seconds, enhancing overall user experience and engagement on mobile devices.
• Deployed applications on AWS, enhancing scalability and reducing downtime by 20%, leading to improved performance and
reliability.
Technologies: JavaScript, HTML, CSS, React.js, Node.js, AWS, Git, GitHub
Personal Projects
PrepMate
AI Mock Interview Platform Sep 2024 – Present
• Architected an AI-driven mock interview platform using React and Node.js, increasing user engagement by 40% through
intuitive design.
• Leveraged the Gemini API for real-time interview questions tailored to 100+ user resumes, enhancing engagement.
• Implemented audio and webcam analysis with Teachable Machine and TensorFlow.js, providing instant feedback that
boosted user confidence by 20%.
• Developed a feedback system evaluating strengths and weaknesses, improving user preparation effectiveness by 30%.
• Worked in agile teams, utilizing CI/CD practices to enhance deployment efficiency by 30% and drive continuous improvement.
Technologies: React, Node.js, PostgreSQL, Gemini API, Teachable Machine, Tensorflow.js, AWS, Docker, Git, GitHub
POS System
Restaurant Billing System Mar 2024 – June 2024
• Developed a Point of Sale (POS) application using React and Node.js, which enhanced transaction speed by 40%.
• Synchronized inventory in real-time with MongoDB, reducing discrepancies by 25%.
• Established secure user authentication and role-based access controls, enhancing system security and user management
efficiency.
• Deployed on AWS, achieving a 20% improvement in uptime.
• Collaborated with stakeholders to deliver user-driven features.
Technologies: React, Node.js, MongoDB, AWS, Git, GitHub, Docker
Education
Savitribai Phule Pune University May 2025 (Expected)
B.E. in Information Technology (CGPA: 7.88*)
Dr. Ambedkar College, Nagpur 2021
Class XII (HSC) (Percentage:94.18%)
S.F.L. High School, Dhamangaon Rly 2019
Class X (SSC) (Percentage: 93.80%)`; // Replace with your dummy resume
  const dummyJobRole = "REACT DEVELOPER";
  const dummyJobDescription = "REACT";

  
  useEffect(() => {
    const newChatSession = createChatSession();
    setChatSession(newChatSession);
  }, []);
  

  useEffect(() => {
    if (chatSession) {
      introduceAI();
    }
  }, [chatSession]);

  const introduceAI = async () => {
    const introMessage = "Hello! I'm your AI interviewer. Let's begin!";
    addToResponseHistory("AI", introMessage);
    speakText(introMessage);

    const introductionQuestion = "Please introduce yourself.";
    setCurrentQuestion(introductionQuestion);
    addToResponseHistory("AI", introductionQuestion);
    speakText(introductionQuestion);
    setIsLoading(false);
  };

  const addToResponseHistory = (role, text, audio) => {
    setResponseHistory((prev) => [...prev, { role, text, audio }]);
  };

  const handleUserAnswer = async () => {
    const userAnswerText = currentAnswer.trim();
    let finalAnswer = userAnswerText; // Initialize with text input
  
    if (audioChunks.length > 0) {
      try {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const textAnswer = await convertAudioToText(audioBlob);
        if (textAnswer) {
          finalAnswer = textAnswer; // Overwrite with transcribed text
          addToResponseHistory("User", "Audio Answer: " + textAnswer, URL.createObjectURL(audioBlob));
          console.log("Audio Transcription:", textAnswer);
        } else {
          console.error("Speech-to-text failed.");
          addToResponseHistory("User", "Audio Answer (Transcription failed)", URL.createObjectURL(audioBlob));
        }
      } catch (error) {
        console.error("Error converting audio to text:", error);
        addToResponseHistory("User", "Audio Answer (Transcription error)", URL.createObjectURL(audioBlob));
      }
    } else {
      addToResponseHistory("User", finalAnswer); // Use text input if no audio
    }
  
  
      if (!userIntroduced) {
        setUserName(finalAnswer);
        setUserIntroduced(true);
      }
  
    try {
      setLoadingNextQuestion(true);
      const nextQuestion = await getNextQuestion(finalAnswer, userName, responseHistory, startTime, dummyResume, dummyJobRole, dummyJobDescription); // Use finalAnswer
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        addToResponseHistory("AI", nextQuestion);
        speakText(nextQuestion);
      } else {
        console.error("Failed to get the next question. Check Gemini API and prompt.");
        setCurrentQuestion("Error getting the next question. Please check the Gemini API and prompt.");
      }
      setCurrentAnswer("");
      setAudioChunks([]);
    } catch (error) {
      console.error("Error in handleUserAnswer:", error);
      addToResponseHistory("AI", "Error getting the next question. Please try again.");
      setCurrentQuestion("Error getting the next question. Please try again.");
      speakText("Error getting the next question. Please try again.");
    } finally {
      setLoadingNextQuestion(false);
    }
  };
  const convertAudioToText = (audioBlob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const audioBuffer = e.srcElement.result;

        const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };

        recognition.onerror = (event) => {
          reject(event.error);
        };

        try {
          recognition.start(audioBuffer);
        } catch (error) {
          console.error("Recognition start error:", error);
          reject(error);
        }
      };
      reader.readAsArrayBuffer(audioBlob);
    });
  };

  const getNextQuestion = async (userAnswer, userName, responseHistory, dummyResume, dummyJobRole, dummyJobDescription) => {
    try {
      const messages = responseHistory.map((item) => ({
        role: item.role === "AI" ? "assistant" : "user",
        content: item.text,
      }));
  
      if (userAnswer) {
        messages.push({ role: "user", content: userAnswer });
        console.log("User Answer sent to Gemini:", userAnswer); // Log the user's answer
      }

      let prompt = "";

      switch (interviewStage) {
        case "introduction":
          if (responseHistory.length <= 2) { // Check if it's the very first question
            prompt = `Ask a single, direct, and concise settling-in question to make the candidate, ${userName}, feel comfortable. Consider their resume: ${dummyResume}. Do not offer options.`;
          } else {
            // Subsequent introduction questions (if any)
            prompt = `Ask a single, direct, and concise settling-in question to make the candidate, ${userName}, feel comfortable, referring to their previous answer: "${responseHistory[responseHistory.length - 1].text}". Consider their resume: ${dummyResume}. Do not offer options.referring to the candidate's previous answer: "${responseHistory[responseHistory.length - 1].text}" If the candidate's answer is a question, try to answer it briefly and politely., and addressing them as ${userName}. If the candidate's answer is vague, incomplete, or unclear, ask a single, direct, and concise follow-up question to get more details. Do not offer options. For example: "Based on your previous answer, ${userName}, could you elaborate on...?"`;
          }
          if (responseHistory.length > 2) setInterviewStage("technical");
          break;
        case "technical":
          prompt = `Ask a single, direct, and concise technical question about React, referring to the candidate's previous answer: "${responseHistory[responseHistory.length - 1].text}" If the candidate's answer is a question, try to answer it briefly and politely., and addressing them as ${userName}. If the candidate's answer is vague, incomplete, or unclear, ask a single, direct, and concise follow-up question to get more details. Do not offer options. For example: "Based on your previous answer, ${userName}, could you elaborate on...?"`;
          if (responseHistory.length > 6) setInterviewStage("managerial");
          break;
        case "managerial":
          prompt = `Ask a single, direct, and concise managerial/leadership question, referring to the candidate's previous answer: "${responseHistory[responseHistory.length - 1].text}", and addressing them as ${userName}. If the candidate's answer is vague, incomplete, or unclear, ask a single, direct, and concise follow-up question to get more details. Do not offer options.`;
          if (responseHistory.length > 8) setInterviewStage("hr");
          break;
        case "hr":
          prompt = `Ask a single, direct, and concise HR-related question, referring to the candidate's previous answer: "${responseHistory[responseHistory.length - 1].text}", and addressing them as ${userName}. If the candidate's answer is vague, incomplete, or unclear, ask a single, direct, and concise follow-up question to get more details. Do not offer options.`;
          if (responseHistory.length > 10) setInterviewStage("closing");
          break;
        case "closing":
          prompt = `Thank the candidate, ${userName}, for their time and conclude the interview. Do not ask any further questions.`;
          break;
        default:
          prompt = "Ask the next interview question.";
      }
      const inputPrompt = messages.map((m) => `${m.role}: ${m.content}`).join('\n') + `\n${prompt}`;

      console.log("Input Prompt:", inputPrompt);

      const result = await chatSession.sendMessage(inputPrompt);

      if (!result || !result.response || !result.response.text) {
        console.error("Invalid Gemini API response:", result);
        return null;
      }

      const responseText = await result.response.text();
      console.log("Raw Gemini Response:", responseText);

      const extractedQuestion = extractQuestionFromResponse(responseText);

      if (!extractedQuestion) {
        console.error("Could not extract a question from the response. Check Gemini response format.");
        return "I'm having trouble generating the next question. Please check the Gemini response format.";
      }

      return extractedQuestion;
    } catch (error) {
      console.error("Error generating next question:", error);
      return null;
    }
  };

  const extractQuestionFromResponse = (responseText) => {
    try {
      const jsonResponse = JSON.parse(responseText);
      if (jsonResponse && jsonResponse.question) {
        return jsonResponse.question;
      }
    } catch (jsonError) {
      // Not JSON, proceed to next check
    }

    const questionMatch = responseText.match(/Question:\s*(.+)/);
    if (questionMatch) {
      return questionMatch[1].trim();
    }

    const newlineIndex = responseText.indexOf('\n');
    if (newlineIndex !== -1) {
      return responseText.substring(0, newlineIndex).trim();
    }

    return responseText.trim();
  };

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        setAudioChunks(chunks);
        setIsRecording(false);
        console.log("Audio chunks recorded:", chunks);

        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result;

          addToResponseHistory("User", "Audio Answer", base64String);

          const nextQuestion = await getNextQuestion("Audio Answer", userName, responseHistory);
          if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
            addToResponseHistory("AI", nextQuestion);
            speakText(nextQuestion);
          } else {
            console.error("Failed to get the next question. Check Gemini API and prompt.");
            setCurrentQuestion("Error getting the next question. Please check the Gemini API and prompt.");
          }
          setCurrentAnswer("");
        };
        reader.readAsDataURL(audioBlob);
      };

      recorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      speakText(currentQuestion);
    }
  }, [currentQuestion]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold">AI: {currentQuestion}</h2>
          <textarea
            className="w-full p-2 border rounded mt-3"
            placeholder="Your answer here..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />

          <div className="mt-3 flex gap-4">
            <button
              onClick={handleUserAnswer}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!currentQuestion || loadingNextQuestion || isRecording}
            >
              {loadingNextQuestion ? (
                <LoaderCircle className="animate-spin mr-2" size={16} />
              ) : (
                "Submit Answer"
              )}
            </button>

            {isRecording ? (
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={!currentQuestion}
              >
                Stop Recording
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={!currentQuestion}
              >
                Record Answer
              </button>
            )}
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Conversation History</h3>
            <ul className="mt-2 space-y-1 overflow-y-auto max-h-48">
              {responseHistory.map((item, index) => (
                <li key={index} className={item.role === "User" ? "text-blue-600" : "text-gray-800"}>
                  <strong>{item.role === "User" ? "You: " : "AI: "}</strong>
                  {item.text}
                  {item.audio && (
                    <audio controls className="mt-2">
                      <source src={item.audio} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionSection;
