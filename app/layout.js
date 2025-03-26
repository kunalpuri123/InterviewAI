import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import {Squares} from "@/components/ui/squares-background"
import { Spotlight } from "@/components/ui/Spotlight";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepMate",
  description: "AI Interview application.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        
        <body className={inter.className}>
        <Toaster />
        <div>
        
        {children}
        </div>
        
        
        <div className="fixed inset-0 z-[-1]">
        
            <div className="absolute top-0 left-0 w-full h-full">
            {/* <Squares
                direction="diagonal"
                speed={0.5}
                squareSize={40}
                borderColor="#333"
                hoverFillColor="#222"
              /> */}
            </div>
          </div>
        
         
        </body>
      </html>
    </ClerkProvider>
  );
}
