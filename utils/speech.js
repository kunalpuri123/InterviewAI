// utils/speech.js
export const speakText = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) { // Check if window and speechSynthesis are defined
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      console.warn('Text-to-speech is not supported in this browser.');
    }
  };