"use client";
import { useRouter } from "next/navigation";
import { AnimatedText } from "@/components/ui/AnimatedText";
import Navbar from "../components/ui/Navbar";
import { CardWithSpline } from "@/components/ui/CardWithSpline";
import { IconCloud } from "@/components/ui/CustomIcon"; // Ensure IconCloud is correctly exported
import { StarBorder } from "@/components/ui/StarBorder";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  const router = useRouter()

  // Handle click event to navigate
  const handleClick = () => {
    router.push("/roadmaps") // Navigate to the '/dashboard' route
  }
  
  const slugs = [
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
  ];
  

  return (
    <div>
      <Navbar />
      <CardWithSpline />
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        {/* Responsive container for layout */}
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-7xl">
          {/* Left Section */}
          <div className="flex flex-col items-start space-y-4 text-center md:text-left">
            <AnimatedText
              text="Roadmaps"
              textClassName="text-[4rem] md:text-[6rem] font-bold text-white"
            />
            <StarBorder color="hsl(208, 55.60%, 5.30%)" speed="4s">
              <button onClick={handleClick} className="text-white font-bold px-6 py-3 bg-black-500 rounded-lg shadow-md hover:bg-blue-600">
                Explore our Roadmaps
              </button>
            </StarBorder>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center w-full max-w-lg relative md:ml-24 lg:ml-24">
            <div className="relative w-full">
              <IconCloud iconSlugs={slugs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
