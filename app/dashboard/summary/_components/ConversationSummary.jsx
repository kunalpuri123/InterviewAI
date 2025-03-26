'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ConversationSummary() {
  const { conversation_id } = useParams(); // Get conversation_id from dynamic route
  const [conversationData, setConversationData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!conversation_id) return; // Ensure conversation_id is available

    console.log("Extracted conversation_id:", conversation_id); // Debugging

    const fetchConversationData = async () => {
      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversations/${conversation_id}`,
          {
            method: "GET",
            headers: {
              "xi-api-key": "sk_3f62890c311087589e86c7b2132836063de7aa9c86e3f9db",
            },
          }
        );
        const data = await response.json();
        setConversationData(data);
      } catch (error) {
        console.error("Error fetching conversation data:", error);
      }
    };

    const fetchAudio = async () => {
      try {
        const audioResponse = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversations/${conversation_id}/audio`,
          {
            method: "GET",
            headers: {
              "xi-api-key": "sk_3f62890c311087589e86c7b2132836063de7aa9c86e3f9db",
            },
          }
        );
        
        if (!audioResponse.ok) throw new Error("Failed to fetch audio");
        
        const audioBlob = await audioResponse.blob();
        const audioObjectUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioObjectUrl);
      } catch (error) {
        console.error("Error fetching conversation audio:", error);
      }
    };

    fetchConversationData();
    fetchAudio();
  }, [conversation_id]);

  if (!conversationData) return <div>Loading...</div>;

  const { transcript, analysis } = conversationData;
  const transcriptSummary = analysis?.transcript_summary || "No summary available";

  // ✅ Print Functionality
  const handlePrint = () => {
    const content = document.getElementById("printableContent");
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Prepmate</title></head><body>");
    printWindow.document.write("<h1>Prepmate</h1>");
    printWindow.document.write(content.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="conversation-summary p-4 bg-black text-white rounded-md">
      <h2 className="text-lg font-semibold">Conversation Summary</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Conversation:</h3>
        <div className="mt-2 text-sm">
          {transcript?.map((message, index) => (
            <div key={index} className="mb-2">
              <strong>{message.role === "agent" ? "AI:" : "User:"}</strong>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold mt-4">Analysis Summary:</h3>
        <p>{transcriptSummary}</p>
      </div>

      {/* ✅ Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Print
      </button>

      {/* ✅ Audio Player with Controls */}
      {audioUrl && (
        <div className="mt-4">
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* ✅ Audio Download Option */}
      {audioUrl && (
        <a
          href={audioUrl}
          download={`conversation_${conversation_id}.mp3`}
          className="mt-4 block px-4 py-2 bg-green-500 text-white rounded-md text-center hover:bg-green-600"
        >
          Download Audio
        </a>
      )}

      {/* ✅ Printable Content (Hidden) */}
      <div id="printableContent" style={{ display: "none" }}>
        <div className="p-4 bg-white text-black rounded-md">
          <h2 className="text-lg font-semibold">Conversation Summary</h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Conversation:</h3>
            <div className="mt-2 text-sm">
              {transcript.map((message, index) => (
                <div key={index} className="mb-2">
                  <strong>{message.role === "agent" ? "AI:" : "User:"}</strong>
                  <p>{message.message}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-semibold mt-4">Analysis Summary:</h3>
            <p>{transcriptSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
