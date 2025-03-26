"use client";
import { useEffect, useRef } from "react";

export const Waveform = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrame;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#3b82f6";
      
      for(let i = 0; i < canvas.width; i += 3) {
        const height = Math.random() * 30;
        ctx.fillRect(i, (canvas.height - height)/2, 2, height);
      }
      
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      width={800}
      height={120}
    />
  );
};