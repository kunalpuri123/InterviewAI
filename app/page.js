"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedText } from "@/components/ui/AnimatedText";
import Navbar from "../components/ui/Navbar";
import { CardWithSpline } from "@/components/ui/CardWithSpline";
import { IconCloud } from "@/components/ui/CustomIcon";
import { StarBorder } from "@/components/ui/StarBorder";
import VideoTestimonialCarousel from "@/components/ui/Testimonial";
import Footer from "@/components/Footer";
import Image from "next/image";
import core from "../public/core.png";

export default function Home() {
  const router = useRouter();
  const [isLaptop, setIsLaptop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024); // 1024px is a common laptop breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If the screen is too small, show a message
  if (!isLaptop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl font-bold text-center p-6">
        Please use a laptop to access this content.
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <CardWithSpline />
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-7xl">
          <div className="flex flex-col items-start space-y-4 text-center md:text-left">
            <AnimatedText
              text="Roadmaps"
              textClassName="text-[4rem] md:text-[6rem] font-bold text-white"
            />
            <StarBorder color="hsl(208, 55.60%, 5.30%)" speed="4s">
              <button
                onClick={() => router.push("/roadmaps")}
                className="text-white font-bold px-6 py-3 bg-black-500 rounded-lg shadow-md hover:bg-blue-600"
              >
                Explore our Roadmaps
              </button>
            </StarBorder>
          </div>

          <div className="flex items-center justify-center w-full max-w-lg relative md:ml-24 lg:ml-24">
            <div className="relative w-full">
              <IconCloud
                iconSlugs={[
                  "typescript",
                  "javascript",
                  "dart",
                  "java",
                  "react",
                  "flutter",
                  "android",
                  "html5",
                  "css3",
                  "nodedotjs",
                  "express",
                  "nextdotjs",
                  "prisma",
                  "amazonaws",
                  "postgresql",
                  "firebase",
                  "nginx",
                  "vercel",
                  "testinglibrary",
                  "jest",
                  "cypress",
                  "docker",
                  "git",
                  "jira",
                  "github",
                  "gitlab",
                  "visualstudiocode",
                  "androidstudio",
                  "sonarqube",
                  "figma",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-7xl">
          <div className="flex flex-col items-start space-y-4 text-center md:text-left">
            <AnimatedText
              text="CoreSubjects"
              textClassName="text-[4rem] md:text-[6rem] font-bold text-white"
            />
            <StarBorder color="hsl(208, 55.60%, 5.30%)" speed="4s">
              <button
                onClick={() => router.push("/book")}
                className="text-white font-bold px-6 py-3 bg-black-500 rounded-lg shadow-md hover:bg-blue-600"
              >
                Explore CoreSubjects
              </button>
            </StarBorder>
          </div>

          <div className="flex items-center justify-center w-full max-w-lg relative md:ml-24 lg:ml-24">
            <div className="relative w-full">
              <Image src={core} alt="Core Image" />
            </div>
            
          </div>
        </div>
      </div>
      <VideoTestimonialCarousel/>
      <Footer/>
    </div>
    
  );
}
