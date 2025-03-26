"use client";

import React, { useRef, useEffect, useState } from "react";

const ModelPrediction = ({ onPredictions }) => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [maxPrediction, setMaxPrediction] = useState(null); // To store the prediction with the highest probability

  const URL = "https://teachablemachine.withgoogle.com/models/QGq5dchJx/";

  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Load TensorFlow.js and Teachable Machine Image libraries from the CDN
        await new Promise((resolve, reject) => {
          const tfScript = document.createElement("script");
          tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js";
          tfScript.onload = resolve;
          tfScript.onerror = reject;
          document.body.appendChild(tfScript);
        });

        await new Promise((resolve, reject) => {
          const tmScript = document.createElement("script");
          tmScript.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js";
          tmScript.onload = resolve;
          tmScript.onerror = reject;
          document.body.appendChild(tmScript);
        });

        // Load the Teachable Machine model after the scripts are loaded
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        const loadedModel = await window.tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading scripts or model:", error);
      }
    };

    loadScripts();
  }, []);

  useEffect(() => {
    const setupWebcam = async () => {
      if (model) {
        const webcam = new window.tmImage.Webcam(200, 200, true); // width, height, flip
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
    <div>
      {/* Display a progress bar for the prediction with the highest probability */}
      {maxPrediction && (
        <div style={{ color:"white", margin: "20px 0" }}>
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