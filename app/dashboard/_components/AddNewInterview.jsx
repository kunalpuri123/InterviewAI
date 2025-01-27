"use client";
import React, { useState ,useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";



// Ensure the workerSrc is set to the CDN for pdf.worker.min.js
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
}

function AddNewInterview() {

  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [pdfText, setPdfText] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false); // Track if file is uploaded
  const { user } = useUser();
  const router = useRouter();


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component has mounted
    setMounted(true);
  }, []);

  // Handle the file upload and parse the PDF
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);

      try {
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        console.log(`PDF loaded with ${pdf.numPages} pages.`);

        // Get text content from all pages and log it
        let fullText = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + " "; // Append text from each page
        }
        setPdfText(fullText);
        setFileUploaded(true); // Mark file as uploaded
        console.log("Extracted Text from Resume:", fullText); // Print the entire extracted text to the console
      } catch (error) {
        console.error("Error loading PDF:", error);
        setPdfText(""); // Ensure pdfText is cleared in case of an error
        setFileUploaded(false); // Reset fileUploaded state on error
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if file is uploaded
    if (!fileUploaded) {
      alert("Please upload a valid resume.");
      return; // Prevent form submission if no file is uploaded
    }

    setLoading(true);

    const inputPrompt = `
      Job position: ${jobPosition}, 
      Job Description: ${jobDescription}, 
      Years of Experience: ${jobExperience},
      Resume Content: ${pdfText ? pdfText : "No resume uploaded or could not extract text."}
      Based on the Job Position, Job Description, Years of Experience, and Resume Content, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format.Asking question based on resume is necessary if uploaded.. Each question and answer should be in the following format:
      {
        "question": "Your question here",
        "answer": "Your answer here"
      }`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      console.log("Raw response:", responseText);

      const jsonMatch = responseText.match(/\[.*?\]/s);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response");
      }

      const jsonResponsePart = jsonMatch[0];
      console.log("Extracted JSON part:", jsonResponsePart);

      try {
        const mockResponse = JSON.parse(jsonResponsePart.trim());
        console.log("Parsed JSON response:", mockResponse);
        setJsonResponse(mockResponse);

        const jsonString = JSON.stringify(mockResponse);
        const res = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: jsonString,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
            resumeText: pdfText, // Include the parsed resume text here
          })
          .returning({ mockId: MockInterview.mockId });

        setLoading(false);
        router.push(`dashboard/interview/${res[0]?.mockId}`);
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        alert("An error occurred while parsing the AI response. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      alert("An error occurred while generating interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <p>
                  Add details about your job position/role, job description, and
                  years of experience
                </p>
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/Tech Stack (In short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, MySql etc"
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="1"
                    max="70"
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Upload Resume (PDF)</label>
                  <Input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Generating from AI
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
