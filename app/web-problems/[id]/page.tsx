"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CodeEditor } from "@/components/code-editor"
import { WebPreview } from "@/components/web-preview"
import { getWebProblemById, getCategoryColor, getDifficultyColor } from "@/lib/web-problems"
import { RotateCcw, CheckCircle, Clock, Target, Lightbulb, Trophy, Send } from "lucide-react"
import Navbar from "@/components/ui/Navbar"
interface ValidationResult {
  requirement: string
  passed: boolean
  message: string
  score: number
}

export default function WebProblemPage() {
  const params = useParams()
  const problemId = Number.parseInt(params.id as string)
  const problem = getWebProblemById(problemId)

  const [selectedFile, setSelectedFile] = useState<string>("html")
  const [files, setFiles] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState("description")
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [allTasksCompleted, setAllTasksCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{
    passed: boolean
    score: number
    maxScore: number
    percentage: number
    feedback: string
  } | null>(null)

  useEffect(() => {
    if (problem) {
      // Initialize files with starter code
      const initialFiles: Record<string, string> = {}
      Object.entries(problem.starterCode).forEach(([key, value]) => {
        if (value) {
          initialFiles[key] = value
        }
      })
      setFiles(initialFiles)

      // Set the first available file as selected
      const firstFile = Object.keys(initialFiles)[0]
      if (firstFile) {
        setSelectedFile(firstFile)
      }
    }
  }, [problem])

  useEffect(() => {
    // Calculate total score and check completion
    const score = validationResults.reduce((sum, result) => sum + result.score, 0)
    setTotalScore(score)

    const allPassed = validationResults.length > 0 && validationResults.every((r) => r.passed)
    setAllTasksCompleted(allPassed)
  }, [validationResults])

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <p className="text-muted-foreground">The web development challenge you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const updateFile = (filename: string, content: string) => {
    setFiles((prev) => ({
      ...prev,
      [filename]: content,
    }))
  }

  const resetFiles = () => {
    const initialFiles: Record<string, string> = {}
    Object.entries(problem.starterCode).forEach(([key, value]) => {
      if (value) {
        initialFiles[key] = value
      }
    })
    setFiles(initialFiles)
    setValidationResults([])
    setAllTasksCompleted(false)
    setTotalScore(0)
    setIsSubmitted(false)
    setSubmissionResult(null)
  }

  const handleValidationResult = (results: ValidationResult[]) => {
    setValidationResults(results)
  }

  const submitProject = () => {
    if (validationResults.length === 0) {
      alert("Please run your code first to validate the requirements.")
      return
    }

    const score = validationResults.reduce((sum, result) => sum + result.score, 0)
    const maxScore = problem.maxScore
    const percentage = Math.round((score / maxScore) * 100)
    const passedCount = validationResults.filter((r) => r.passed).length
    const totalCount = validationResults.length

    let feedback = ""
    let passed = false

    if (percentage >= 90) {
      feedback = "🎉 Excellent work! You've mastered this challenge!"
      passed = true
    } else if (percentage >= 75) {
      feedback = "👏 Great job! You've completed most requirements successfully."
      passed = true
    } else if (percentage >= 60) {
      feedback = "👍 Good effort! You're on the right track, but there's room for improvement."
      passed = false
    } else {
      feedback = "💪 Keep practicing! Review the requirements and try to implement more features."
      passed = false
    }

    setSubmissionResult({
      passed,
      score,
      maxScore,
      percentage,
      feedback,
    })
    setIsSubmitted(true)

    // Show success/failure message
    if (passed) {
      alert(
        `🎉 Project Submitted Successfully!\n\nScore: ${score}/${maxScore} (${percentage}%)\nRequirements Passed: ${passedCount}/${totalCount}\n\n${feedback}`,
      )
    } else {
      alert(
        `📝 Project Submitted\n\nScore: ${score}/${maxScore} (${percentage}%)\nRequirements Passed: ${passedCount}/${totalCount}\n\n${feedback}`,
      )
    }
  }

  const getFileLanguage = (filename: string) => {
    const extensions: Record<string, string> = {
      html: "html",
      css: "css",
      javascript: "javascript",
      react: "javascript",
      nodejs: "javascript",
      mongodb: "javascript",
    }
    return extensions[filename] || "javascript"
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 75) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const progressPercentage = problem.maxScore > 0 ? (totalScore / problem.maxScore) * 100 : 0

  return (
    <>
    <Navbar/>
    
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* Left Panel - Problem Description */}
      <div className="w-1/3 min-w-[400px] border-r bg-background flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h1 className="text-xl font-bold">{problem.title}</h1>
              <Badge className={getCategoryColor(problem.category)}>{problem.category}</Badge>
              <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
            </div>

            {/* Score Display */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Score Progress</span>
                  <span className={`font-bold ${getScoreColor(progressPercentage)}`}>
                    {totalScore}/{problem.maxScore} ({Math.round(progressPercentage)}%)
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {validationResults.filter((r) => r.passed).length}/
                  {validationResults.length || problem.requirements.length} requirements completed
                </div>
              </CardContent>
            </Card>

            {/* Submission Result */}
            {isSubmitted && submissionResult && (
              <Alert
                className={`mb-4 ${submissionResult.passed ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20"}`}
              >
                <Trophy className={`h-4 w-4 ${submissionResult.passed ? "text-green-600" : "text-yellow-600"}`} />
                <AlertDescription
                  className={
                    submissionResult.passed
                      ? "text-green-800 dark:text-green-200"
                      : "text-yellow-800 dark:text-yellow-200"
                  }
                >
                  <div className="font-medium mb-1">
                    {submissionResult.passed ? "🎉 Project Completed!" : "📝 Project Submitted"}
                  </div>
                  <div className="text-sm">{submissionResult.feedback}</div>
                </AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Project Description</h3>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{problem.description}</div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium text-sm">Estimated Time</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{problem.estimatedTime}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4" />
                        <span className="font-medium text-sm">Max Score</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{problem.maxScore} points</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Project Requirements</h3>
                  <div className="space-y-3">
                    {problem.requirements.map((requirement, index) => {
                      const validationResult = validationResults.find((r) => r.requirement === requirement)
                      const isCompleted = validationResult?.passed || false

                      return (
                        <div
                          key={index}
                          className={`flex items-start gap-3 p-3 border rounded-lg ${isCompleted ? "bg-green-50 border-green-200 dark:bg-green-900/20" : ""}`}
                        >
                          <CheckCircle
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${isCompleted ? "text-green-600" : "text-muted-foreground"}`}
                          />
                          <div className="flex-1">
                            <span className="text-sm">{requirement}</span>
                            {validationResult && (
                              <div className={`text-xs mt-1 ${isCompleted ? "text-green-600" : "text-red-600"}`}>
                                {validationResult.message}
                                {validationResult.score > 0 && (
                                  <span className="ml-2 font-medium">+{validationResult.score} pts</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hints" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Helpful Hints</h3>
                  <div className="space-y-3">
                    {problem.hints.map((hint, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{hint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="objectives" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Learning Objectives</h3>
                  <div className="space-y-3">
                    {problem.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-6 space-y-3">
              <Button className="w-full" onClick={submitProject} disabled={validationResults.length === 0}>
                <Send className="h-4 w-4 mr-2" />
                {validationResults.length === 0 ? "Run Code First to Submit" : "Submit Project"}
              </Button>
              <Button variant="outline" className="w-full" onClick={resetFiles}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Code
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Middle Panel - Code Editor */}
      <div className="w-1/3 min-w-[400px] flex flex-col border-r">
        {/* Editor Header */}
        <div className="border-b p-4 bg-background">
          <div className="flex items-center justify-between">
            <Select value={selectedFile} onValueChange={setSelectedFile}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(files).map((filename) => (
                  <SelectItem key={filename} value={filename}>
                    {filename}.{filename === "react" ? "jsx" : filename === "nodejs" ? "js" : filename}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-hidden">
          <CodeEditor
            language={getFileLanguage(selectedFile)}
            value={files[selectedFile] || ""}
            onChange={(content) => updateFile(selectedFile, content)}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Right Panel - Preview & Console */}
      <div className="w-1/3 min-w-[400px] flex flex-col">
        <WebPreview
          files={files}
          title={problem.title}
          onValidationResult={handleValidationResult}
          requirements={problem.requirements}
          problemId={problemId}
        />
      </div>
    </div>
    </>
  )
}
