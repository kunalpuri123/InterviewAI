'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { chatSession } from '@/utils/GeminiAIModal';

export default function ConversationSummary() {
  const { conversation_id } = useParams();
  const [conversationData, setConversationData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [structuredFeedback, setStructuredFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversation_id) return;

    const fetchData = async () => {
      try {
        const [conversationRes, audioRes] = await Promise.all([
          fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversation_id}`, {
            headers: {
              'xi-api-key: sk_3f62890c311087589e86c7b2132836063de7aa9c86e3f9db',
            },
          }),
          fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversation_id}/audio`, {
            headers: {
              'xi-api-key:sk_3f62890c311087589e86c7b2132836063de7aa9c86e3f9db',
            },
          }),
        ]);

        const data = await conversationRes.json();
        setConversationData(data);

        const audioBlob = await audioRes.blob();
        setAudioUrl(URL.createObjectURL(audioBlob));

        const transcriptText = data.transcript
          ?.map((msg) => `${msg.role === 'agent' ? 'AI' : 'User'}: ${msg.message}`)
          .join('\n');

        const inputPrompt = `
You are an AI interview evaluator. Analyze the following conversation between an AI interviewer and a candidate. Your task is to:

1. For each response given by the user, provide:
- A rating out of 5
- The interviewer's question
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
      "question": "What role are you applying for?",
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

Transcript:
${transcriptText}`;

        setLoading(true);
        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setStructuredFeedback(parsed);
        } else {
          console.warn('No valid JSON found in Gemini response:', responseText);
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
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Prepmate Feedback</title>');
    printWindow.document.write('<style>body { font-family: sans-serif; padding: 20px; } h2 { margin-top: 20px; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (!conversationData || !structuredFeedback) return <div className="text-white">No data available</div>;

  const { transcript, analysis } = conversationData;
  const transcriptSummary = analysis?.transcript_summary || 'No summary available';
  const feedbacks = structuredFeedback.responses || [];
  const overall = structuredFeedback.overallAnalysis || {};

  return (
    <div className="p-6 bg-black text-white min-h-screen space-y-8">
      <h2 className="text-2xl font-bold">🧠 Conversation Summary</h2>

      <div id="printableContent">
        {/* Transcript */}
        <div className="bg-gray-900 rounded-lg p-4 space-y-3">
          {transcript.map((message, index) => (
            <div key={index} className="text-sm">
              <strong>{message.role === 'agent' ? 'AI' : 'User'}:</strong> {message.message}
            </div>
          ))}
        </div>

        {/* Transcript Summary */}
        <div className="bg-gray-800 rounded-md p-4 mt-4">
          <h3 className="text-xl font-semibold mb-2">📋 Transcript Summary</h3>
          <p>{transcriptSummary}</p>
        </div>

        {/* Structured Feedback */}
        <div className="bg-gray-900 rounded-lg p-4 mt-4 space-y-6">
          <h2 className="text-xl font-bold mb-4">📊 Structured Feedback</h2>
          {feedbacks.map((item, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg space-y-2 border border-gray-700">
              <p><strong className="text-blue-400">AI's Question:</strong> {item.question}</p>
              <p><strong className="text-red-400">Rating:</strong> {item.rating}</p>
              <p><strong>Your Answer:</strong> {item.userAns}</p>
              <p><strong>Ideal Answer:</strong> {item.correctAns}</p>
              <p><strong>Feedback:</strong> {item.feedback}</p>
            </div>
          ))}

          {/* Overall Analysis */}
          <div className="mt-6 p-4 bg-gray-800 border border-gray-600 rounded-lg space-y-2">
            <h2 className="text-lg font-bold">🧾 Overall Interview Analysis</h2>
            <p><strong>Grammar:</strong> {overall.grammar}</p>
            <p><strong>Voice Tone:</strong> {overall.voiceTone}</p>
            <p><strong>Confidence/Posture:</strong> {overall.confidence}</p>
            <p><strong>Scope of Improvement:</strong> {overall.scopeOfImprovement}</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        🖨️ Print Summary
      </button>

      {/* Audio Player & Download */}
      {audioUrl && (
        <div className="space-y-3">
          <audio controls className="w-full mt-6">
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <a
            href={audioUrl}
            download={`conversation_${conversation_id}.mp3`}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            ⬇️ Download Audio
          </a>
        </div>
      )}
    </div>
  );
}
