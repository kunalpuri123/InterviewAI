"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Trophy } from "lucide-react"
import type { AptitudeQuestion } from "@/lib/aptitude-questions"

interface AptitudeQuizProps {
  questions: AptitudeQuestion[]
  title: string
  onComplete: (score: number, totalQuestions: number, results: QuestionResult[]) => void
}

interface QuestionResult {
  question: AptitudeQuestion
  userAnswer: string | null
  isCorrect: boolean
  timeSpent: number
}

export function AptitudeQuiz({ questions, title, onComplete }: AptitudeQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60)
  const [results, setResults] = useState<QuestionResult[]>([])
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isQuizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleNextQuestion()
    }
  }, [timeLeft, isQuizCompleted])

  // Reset timer when question changes
  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit)
      setSelectedAnswer("") // Clear selection for new question
      setQuestionStartTime(Date.now())
    }
  }, [currentQuestionIndex, currentQuestion])

  const handleNextQuestion = () => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    const questionResult: QuestionResult = {
      question: currentQuestion,
      userAnswer: selectedAnswer || null,
      isCorrect,
      timeSpent,
    }

    const newResults = [...results, questionResult]
    setResults(newResults)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz completed
      setIsQuizCompleted(true)
      const score = newResults.filter((r) => r.isCorrect).length
      onComplete(score, questions.length, newResults)
    }
  }

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
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

  if (isQuizCompleted) {
    const score = results.filter((r) => r.isCorrect).length
    const percentage = Math.round((score / questions.length) * 100)
    const totalTimeSpent = results.reduce((sum, r) => sum + r.timeSpent, 0)

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>Here are your results for {title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.floor(totalTimeSpent / 60)}m {totalTimeSpent % 60}s
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Question Review</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <Card
                  key={index}
                  className={`border-l-4 ${result.isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium mb-1">
                          Q{index + 1}: {result.question.question}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {result.question.subcategory} • {result.timeSpent}s
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(result.question.difficulty)}>
                          {result.question.difficulty}
                        </Badge>
                        {result.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium">Your answer: </span>
                        <span className={result.isCorrect ? "text-green-600" : "text-red-600"}>
                          {result.userAnswer || "No answer"}
                        </span>
                      </div>
                      {!result.isCorrect && (
                        <div>
                          <span className="font-medium">Correct answer: </span>
                          <span className="text-green-600">{result.question.correctAnswer}</span>
                        </div>
                      )}
                      <div className="text-muted-foreground mt-2">
                        <span className="font-medium">Explanation: </span>
                        {result.question.explanation}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>{currentQuestion.difficulty}</Badge>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className={`font-mono ${timeLeft <= 10 ? "text-red-500" : ""}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{currentQuestion.question}</h3>
          {currentQuestion.passage && (
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Passage:</h4>
              <p className="text-sm">{currentQuestion.passage}</p>
            </div>
          )}
        </div>

        {currentQuestion.options && (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            {currentQuestion.subcategory} • {currentQuestion.tags.join(", ")}
          </div>
          <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className="min-w-24">
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
