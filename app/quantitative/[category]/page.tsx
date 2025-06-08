"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AptitudeQuiz } from "@/components/aptitude-quiz"
import { quantitativeQuestions, getQuantitativeQuestionsByCategory } from "@/lib/aptitude-questions"
import { ArrowLeft, Play, Trophy } from "lucide-react"
import Navbar from "@/components/ui/Navbar"
export default function QuantitativeCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = (params.category as string).replace(/-/g, " ")
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Find the actual category name (case-insensitive)
  const actualCategory = Object.keys(
    quantitativeQuestions.reduce((acc, q) => ({ ...acc, [q.category]: true }), {}),
  ).find((cat) => cat.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase())

  const categoryQuestions = actualCategory ? getQuantitativeQuestionsByCategory(actualCategory) : []

  if (categoryQuestions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-4">The category you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/quantitative")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quantitative
          </Button>
        </div>
      </div>
    )
  }

  const handleQuizComplete = (score: number, totalQuestions: number, results: any[]) => {
    setQuizScore(score)
    setQuizCompleted(true)
  }

  const startNewQuiz = () => {
    setIsQuizStarted(true)
    setQuizCompleted(false)
    setQuizScore(0)
  }

  if (isQuizStarted && !quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="outline" onClick={() => setIsQuizStarted(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </div>
        <AptitudeQuiz questions={categoryQuestions} title={`${actualCategory} Quiz`} onComplete={handleQuizComplete} />
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const stats = {
    total: categoryQuestions.length,
    easy: categoryQuestions.filter((q) => q.difficulty === "Easy").length,
    medium: categoryQuestions.filter((q) => q.difficulty === "Medium").length,
    hard: categoryQuestions.filter((q) => q.difficulty === "Hard").length,
    avgTime: Math.round(categoryQuestions.reduce((sum, q) => sum + q.timeLimit, 0) / categoryQuestions.length),
  }

  return (
    <>
    <Navbar/>
   
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push("/quantitative")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quantitative
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{actualCategory}</h1>
        <p className="text-muted-foreground mb-6">
          Practice {actualCategory.toLowerCase()} problems to improve your quantitative reasoning skills.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.avgTime}s</div>
              <div className="text-sm text-muted-foreground">Avg. Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.easy + stats.medium + stats.hard}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">0%</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Difficulty Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Badge className={getDifficultyColor("Easy")}>{stats.easy} Easy</Badge>
              <Badge className={getDifficultyColor("Medium")}>{stats.medium} Medium</Badge>
              <Badge className={getDifficultyColor("Hard")}>{stats.hard} Hard</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Completion Status */}
        {quizCompleted && (
          <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-medium">Quiz Completed!</div>
                    <div className="text-sm text-muted-foreground">
                      Score: {quizScore}/{categoryQuestions.length} (
                      {Math.round((quizScore / categoryQuestions.length) * 100)}%)
                    </div>
                  </div>
                </div>
                <Button onClick={startNewQuiz}>
                  <Play className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Start Quiz */}
        <Card>
          <CardHeader>
            <CardTitle>Practice Quiz</CardTitle>
            <CardDescription>
              Test your knowledge with {stats.total} questions covering various {actualCategory.toLowerCase()} concepts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Format:</div>
                  <div className="text-muted-foreground">Multiple Choice Questions</div>
                </div>
                <div>
                  <div className="font-medium">Time Limit:</div>
                  <div className="text-muted-foreground">Varies per question</div>
                </div>
                <div>
                  <div className="font-medium">Scoring:</div>
                  <div className="text-muted-foreground">1 point per correct answer</div>
                </div>
                <div>
                  <div className="font-medium">Attempts:</div>
                  <div className="text-muted-foreground">Unlimited</div>
                </div>
              </div>

              <Button onClick={startNewQuiz} size="lg" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Quiz ({stats.total} Questions)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Preview */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Question Preview</h2>
          <div className="grid gap-4">
            {categoryQuestions.slice(0, 3).map((question) => (
              <Card key={question.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium mb-1">{question.question}</div>
                      <div className="text-sm text-muted-foreground">
                        {question.subcategory} • {question.timeLimit}s
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
