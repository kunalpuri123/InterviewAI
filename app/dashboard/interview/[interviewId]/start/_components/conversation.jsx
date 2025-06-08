'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { chatSession } from "@/utils/GeminiAIModal"; // Assumes your Gemini setup is in lib/gemini.js

export default function ConversationSummary() {
  const { conversation_id } = useParams();
  const [conversationData, setConversationData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [structuredFeedback, setStructuredFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch from ElevenLabs
  useEffect(() => {
    if (!conversation_id) return;

    const fetchData = async () => {
      try {
        const [conversationRes, audioRes] = await Promise.all([
          fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversation_id}`, {
            headers: {
              'xi-api-key': process.env.NEXT_PUBLIC_ELEVEN_API_KEY,
            },
          }),
          fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversation_id}/audio`, {
            headers: {
              'xi-api-key': process.env.NEXT_PUBLIC_ELEVEN_API_KEY,
            },
          }),
        ]);

        const data = await conversationRes.json();
        setConversationData(data);

        const audioBlob = await audioRes.blob();
        setAudioUrl(URL.createObjectURL(audioBlob));

        // Send to Gemini
        const transcriptText = data.transcript
          ?.map((msg) => `${msg.role === 'agent' ? 'AI' : 'User'}: ${msg.message}`)
          .join('\n');

        const inputPrompt = `
You are an AI interview evaluator. Analyze the following conversation between an AI interviewer and a candidate. Your task is to:

1. For each response given by the user, provide:
- A rating out of 5
- The user's actual answer
- A better or ideal version of the answer
- Constructive feedback for improvement

2. Then provide a summary of:
- Grammar
- Voice Tone
- Confidence/Posture (from sentence clarity, assertiveness)
- Scope of Improvement

Return only valid JSON in this format:
{
  "responses": [
    {
      "rating": "4/5",
      "userAns": "I'm applying as a React developer.",
      "correctAns": "I'm applying for the React Developer role with 2 years of experience.",
      "feedback": "Add your years of experience and key skills."
    }
  ],
  "overallAnalysis": {
    "grammar": "Some grammar issues",
    "voiceTone": "Confident",
    "confidence": "Moderate confidence",
    "scopeOfImprovement": "Add more specific examples"
  }
}

Here is the transcript:
${transcriptText}
`;

        setLoading(true);
        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setStructuredFeedback(parsed);
        } else {
          console.warn('No JSON match found in Gemini response:', responseText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [conversation_id]);

  const handlePrint = () => {
    const content = document.getElementById('printableContent');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Prepmate</title></head><body>');
    printWindow.document.write('<h1>Prepmate</h1>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <div className="text-white">Loading...</div>;

  if (!conversationData) return <div className="text-white">No data available</div>;

  const { transcript, analysis } = conversationData;
  const transcriptSummary = analysis?.transcript_summary || 'No summary available';

  return (
    <div className="conversation-summary p-4 bg-black text-white rounded-md">
      <h2 className="text-lg font-semibold">Conversation Summary</h2>

      {/* 🧠 Transcript */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Conversation:</h3>
        <div className="mt-2 text-sm">
          {transcript?.map((message, index) => (
            <div key={index} className="mb-2">
              <strong>{message.role === 'agent' ? 'AI:' : 'User:'}</strong> {message.message}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold mt-4">Analysis Summary:</h3>
        <p>{transcriptSummary}</p>
      </div>

      {/* 🖨️ Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Print
      </button>

      {/* 🎧 Audio */}
      {audioUrl && (
        <div className="mt-4">
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* 📥 Download */}
      {audioUrl && (
        <a
          href={audioUrl}
          download={`conversation_${conversation_id}.mp3`}
          className="mt-4 block px-4 py-2 bg-green-500 text-white rounded-md text-center hover:bg-green-600"
        >
          Download Audio
        </a>
      )}

      {/* 📊 Gemini Feedback */}
      {structuredFeedback && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Structured Feedback</h2>
          {structuredFeedback.responses?.map((item, idx) => (
            <div key={idx} className="my-4 border rounded-lg p-4 bg-gray-900">
              <h2 className="text-red-500">
                <strong>Rating:</strong> {item.rating}
              </h2>
              <h2 className="bg-red-50 text-red-900 p-2 rounded-md text-sm">
                <strong>Your Answer:</strong> {item.userAns}
              </h2>
              <h2 className="bg-green-50 text-green-900 p-2 rounded-md text-sm">
                <strong>Correct Answer Looks Like:</strong> {item.correctAns}
              </h2>
              <h2 className="bg-blue-50 text-blue-900 p-2 rounded-md text-sm">
                <strong>Feedback:</strong> {item.feedback}
              </h2>
            </div>
          ))}

          <div className="mt-6 p-4 border rounded-lg bg-white text-black">
            <h2 className="text-xl font-bold mb-2">Overall Interview Analysis</h2>
            <p><strong>Grammar:</strong> {structuredFeedback.overallAnalysis.grammar}</p>
            <p><strong>Voice Tone:</strong> {structuredFeedback.overallAnalysis.voiceTone}</p>
            <p><strong>Confidence/Posture:</strong> {structuredFeedback.overallAnalysis.confidence}</p>
            <p><strong>Scope of Improvement:</strong> {structuredFeedback.overallAnalysis.scopeOfImprovement}</p>
          </div>
        </div>
      )}

      {/* 🖨️ Hidden Printable Content */}
      <div id="printableContent" style={{ display: 'none' }}>
        <div className="p-4 bg-white text-black rounded-md">
          <h2 className="text-lg font-semibold">Conversation Summary</h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Conversation:</h3>
            {transcript?.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>{message.role === 'agent' ? 'AI:' : 'User:'}</strong> {message.message}
              </div>
            ))}
            <h3 className="text-lg font-semibold mt-4">Analysis Summary:</h3>
            <p>{transcriptSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
