"use client";

import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as tmImage from "@teachablemachine/image";

const ModelPrediction = ({ onPredictions }) => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [labelContainer, setLabelContainer] = useState([]);

  const URL = "https://teachablemachine.withgoogle.com/models/HwhJHY8IR/";

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      try {
        const model = await tmImage.load(modelURL, metadataURL);
        setModel(model);
        setMaxPredictions(model.getTotalClasses());
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const setupWebcam = async () => {
      if (webcamRef.current && model) {
        const webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
        await webcam.setup();
        await webcam.play();
        webcamRef.current.appendChild(webcam.canvas);
        setLabelContainer(new Array(maxPredictions).fill(""));
        window.requestAnimationFrame(loop);

        async function loop() {
          webcam.update();
          await predict(webcam, model);
          window.requestAnimationFrame(loop);
        }
      }
    };

    setupWebcam();
  }, [model, maxPredictions]);

  const predict = async (webcam, model) => {
    const prediction = await model.predict(webcam.canvas);
    const predictions = prediction.map(p => ({
      className: p.className,
      probability: parseFloat(p.probability).toFixed(2), // Ensure probability is a number
    }));

    if (onPredictions) {
      onPredictions(predictions);
    }
    
    setLabelContainer(predictions);
  };

  return (
    <div>
      <div ref={webcamRef}></div>
      <div id="label-container">
        {labelContainer.map((label, index) => (
          <div key={index}>{label.className}: {label.probability}</div>
        ))}
      </div>
    </div>
  );
};

export default ModelPrediction;
