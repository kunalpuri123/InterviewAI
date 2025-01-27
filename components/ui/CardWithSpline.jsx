'use client'


import { useRouter } from "next/navigation";  

import { Suspense, lazy, useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';  // Assuming you have this utility in your project
import { FeyButton } from './lockicon';

// Lazy load the Spline component from the @splinetool package
const Spline = lazy(() => import('@splinetool/react-spline'));

// Spotlight component to create an interactive spotlight effect on the screen
function Spotlight({ className, size = 200, springOptions = { bounce: 0 } }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!parentElement) return;
    const { left, top } = parentElement.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }, [mouseX, mouseY, parentElement]);

  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard"); // Navigate to the '/dashboard' route
  };

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        'from-zinc-50 via-zinc-100 to-zinc-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}

// SplineScene component to load and render the 3D scene using Spline
function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}

// Card component that wraps the content and adds style
function Card({ className, children }) {
  return (
    <div className={`rounded-lg  bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// Main component combining Spotlight, SplineScene, and Card
export function CardWithSpline() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full bg-black">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
        <h1
          className="text-2xl md:text-4xl font-normal leading-[47.52px] text-left group hover:scale-105 transition-all duration-500"
          style={{
            fontFamily: 'Nasalization, sans-serif',
            letterSpacing: '-0.05em',
          }}
        >
          <span className="text-white">Prep</span>
          <i
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move"
            style={{ display: 'inline-block' }}
          >
            Mate
          </i>
        </h1>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          MOCK INTERVIEW 
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
          "Master your interviews, tackle challenges, and unlock career opportunities."
          </p>
       
          
        </div>
        <div className="min-h-screen p-8 flex items-center justify-center">
      <FeyButton  >Start Interview</FeyButton>
    </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
