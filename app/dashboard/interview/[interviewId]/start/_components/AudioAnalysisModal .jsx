import React, { useEffect, useState } from "react";

import * as speechCommands from "@tensorflow-models/speech-commands";

const AudioAnalysis = ({ handleAudioFeedback }) => {
  const [recognizer, setRecognizer] = useState(null);
  const [audioPredictions, setAudioPredictions] = useState([]);

  useEffect(() => {
    createModel();
  }, []);

  // Initialize the Teachable Machine model
  const createModel = async () => {
    const URL = "https://teachablemachine.withgoogle.com/models/BEj4b0Ze-/"; // URL of your model
    const checkpointURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const recognizer = speechCommands.create(
      "BROWSER_FFT",
      undefined,
      checkpointURL,
      metadataURL
    );

    await recognizer.ensureModelLoaded();
    setRecognizer(recognizer);
    startListening(recognizer);
  };

  const startListening = (recognizer) => {
    recognizer.listen(
      (result) => {
        const scores = result.scores;
        const labels = recognizer.wordLabels();
        const predictions = labels.map((label, index) => ({
          label,
          score: (scores[index] * 100).toFixed(2), // Display percentage
        }));

        setAudioPredictions(predictions);

        // Send predictions back to parent component
        handleAudioFeedback(predictions);
      },
      {
        probabilityThreshold: 0.75,
        overlapFactor: 0.5,
      }
    );
  };

  const stopListening = () => {
    if (recognizer) {
      recognizer.stopListening();
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [recognizer]);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Audio Analysis</h2>
      <div id="label-container">
        {audioPredictions.length > 0 ? (
          <div>
            {audioPredictions.map((prediction, index) => (
              <div key={index}>
                {prediction.label}: {prediction.score}%
              </div>
            ))}
          </div>
        ) : (
          <p>No predictions yet. Start speaking to see the results.</p>
        )}
      </div> */}
    </div>
  );
};

export default AudioAnalysis;