


"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
    {
      video: "https://prepmate.s3.eu-north-1.amazonaws.com/Stepping+into+success+with+Sinhgad+Engineering+College!+This+is+just+the+beginning+for+Kunal+as+he+takes+first+step+towards+a+bright+future.+Here%E2%80%99s+to+many+more+success+stories!+As+Kunal+embarks+on+his+professional+journey%2C+he+joins+the+r.mp4",
      text: "This platform has transformed my career!",
      name: "Kunal Puri",
    },
    {
      video: "https://prepmate.s3.eu-north-1.amazonaws.com/omkar+vdo.mp4",
      text: "Amazing experience, highly recommend it!",
      name: "Omkar Unchgaokar",
    },
    {
      video: "https://prepmate.s3.eu-north-1.amazonaws.com/sahil+vdo.mp4",
      text: "A game-changer for professionals.",
      name: "Sahil Gidwani",
    },

  ];

export default function VideoTestimonialCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [scrollX, setScrollX] = useState(0);

  const handleScroll = (direction) => {
    setScrollX((prev) => prev + (direction === "left" ? 500 : -500));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Alumni Testimonials</h2>
      <div
        className="relative flex items-center w-full max-w-6xl overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex w-max space-x-6"
          animate={{ x: isPaused ? scrollX : [scrollX, scrollX - 100, scrollX] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="w-[500px] h-[400px] flex-shrink-0 text-center p-6 bg-black-800 rounded-lg shadow-xl">
              <video className="w-full h-[300px] object-contain rounded-lg shadow-lg" controls src={testimonial.video} />
              <p className="mt-4 text-gray-300 text-lg italic">"{testimonial.text}"</p>
              <h3 className="mt-2 font-semibold text-xl">- {testimonial.name}</h3>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button onClick={() => handleScroll("left")} className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
          <ArrowLeft size={30} className="text-white" />
        </button>
        <button onClick={() => handleScroll("right")} className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
          <ArrowRight size={30} className="text-white" />
        </button>
      </div>
    </div>
  );
}
