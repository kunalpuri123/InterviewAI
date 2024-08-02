const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
export const chatSession = model.startChat({
  generationConfig,
});

// export const sendMessage = async (message) => {
//   try {
//     // Initialize chat session within the function
//     const chatSession = model.startChat({
//       generaStionConfig,
//     });

//     const response = await chatSession.sendMessage({
//       inputText: message,
//     });
//     return response.outputText;
//   } catch (error) {
//     console.error('Error communicating with Gemini:', error);
//     throw error;
//   }
// };
