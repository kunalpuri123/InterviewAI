"use client";

import React, { useRef, useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const ModelPrediction = ({ onPredictions }) => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [maxPrediction, setMaxPrediction] = useState(null); // To store the prediction with the highest probability

  const URL = "https://teachablemachine.withgoogle.com/models/TKsXlQxYG/";

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      try {
        // Fetching model and metadata with no-cors mode
        const responseModel = await fetch(modelURL, { mode: "no-cors" });
        const responseMetadata = await fetch(metadataURL, { mode: "no-cors" });
        
        // Use the response here for further processing if needed
        const model = await tmImage.load(modelURL, metadataURL);
        setModel(model);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const setupWebcam = async () => {
      if (model) {
        const webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
        await webcam.setup();
        await webcam.play();
        webcamRef.current = webcam; // Store the webcam instance in the ref
        window.requestAnimationFrame(loop);

        async function loop() {
          webcam.update();
          await predict(webcam, model);
          window.requestAnimationFrame(loop);
        }
      }
    };

    setupWebcam();
  }, [model]);

  const predict = async (webcam, model) => {
    const prediction = await model.predict(webcam.canvas);
    const maxPrediction = prediction.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );

    setMaxPrediction(maxPrediction);

    if (onPredictions) {
      onPredictions([maxPrediction]); // Sending the highest prediction only
    }
  };

  return (
    <div style={{ opacity: 0 }}>
      {/* Display a progress bar for the prediction with the highest probability */}
      {maxPrediction && (
        <div style={{ margin: "20px 0" }}>
          <div>{maxPrediction.className}</div>
          <div
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
              height: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "#3b82f6",
                height: "100%",
                borderRadius: "10px",
                width: `${maxPrediction.probability * 100}%`, // Scale probability to percentage
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPrediction;
