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
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Trophy, TrendingUp, Globe, Calculator, BookOpen, Target, Users } from "lucide-react"


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
          <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                   <span className="text-white">Prep</span>
            <i className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move">
              Mate
            </i> Code <span className="text-primary">Buddy</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Master coding, quantitative reasoning, and English with our comprehensive platform. Practice problems, track
          progress, and ace your interviews and competitive exams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/problems">Start Coding</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/quantitative">Practice Aptitude</Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Algorithm Problems</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Solved this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Web Projects</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Completed projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aptitude Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Average accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#142</div>
            <p className="text-xs text-muted-foreground">Keep improving!</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Coding Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Coding Practice</h2>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Algorithm Problems</CardTitle>
                <Badge variant="secondary">Easy</Badge>
              </div>
              <CardDescription>Master data structures and algorithms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Popular: Two Sum, Valid Parentheses</div>
                <Button asChild className="w-full">
                  <Link href="/problems">Practice Algorithms</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Web Development</CardTitle>
                <Badge variant="secondary">Projects</Badge>
              </div>
              <CardDescription>Build real-world applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">React, Node.js, MongoDB projects</div>
                <Button asChild className="w-full">
                  <Link href="/web-problems">Start Building</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quantitative Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Quantitative Aptitude</h2>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Arithmetic & Algebra</CardTitle>
                <Badge variant="secondary">10 Topics</Badge>
              </div>
              <CardDescription>Master fundamental math concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Percentage, Profit-Loss, Time-Work</div>
                <Button asChild className="w-full">
                  <Link href="/quantitative">Practice Math</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Data Interpretation</CardTitle>
                <Badge variant="secondary">Charts</Badge>
              </div>
              <CardDescription>Analyze graphs and tables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Tables, Bar charts, Pie charts</div>
                <Button asChild className="w-full">
                  <Link href="/quantitative">Analyze Data</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* English Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">English Preparation</h2>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Grammar & Vocabulary</CardTitle>
                <Badge variant="secondary">Essential</Badge>
              </div>
              <CardDescription>Perfect your language skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Tenses, Articles, Synonyms</div>
                <Button asChild className="w-full">
                  <Link href="/english">Improve English</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Reading Comprehension</CardTitle>
                <Badge variant="secondary">Advanced</Badge>
              </div>
              <CardDescription>Enhance reading and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Passages, Main ideas, Inferences</div>
                <Button asChild className="w-full">
                  <Link href="/english">Practice Reading</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
            <p className="text-muted-foreground">
              Complete preparation for coding interviews, aptitude tests, and competitive exams
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor your improvement with detailed analytics and performance insights
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Learning</h3>
            <p className="text-muted-foreground">Learn with thousands of students and compete on global leaderboards</p>
          </div>
        </div>
      </div>
    </div>
      <VideoTestimonialCarousel/>
      <Footer/>
    </div>
    
  );
}
