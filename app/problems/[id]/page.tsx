"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeEditor } from "@/components/code-editor"
import { DetailedTestResults } from "@/components/detailed-test-results"
import { SolutionModal } from "@/components/solution-modal"
import { getProblemById, getDifficultyColor } from "@/lib/problems"
import { executeCode } from "@/lib/code-execution"
import { Play, RotateCcw, Eye, AlertTriangle, CheckCircle, XCircle, Send } from "lucide-react"

export default function ProblemPage() {
  const params = useParams()
  const problemId = Number.parseInt(params.id as string)
  const problem = getProblemById(problemId)

  const [selectedLanguage, setSelectedLanguage] = useState<"javascript" | "python" | "java">("javascript")
  const [code, setCode] = useState("")
  const [testResults, setTestResults] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("code")
  const [showSolution, setShowSolution] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"none" | "success" | "partial" | "failed">("none")

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[selectedLanguage])
      setTestResults(null)
      setShowResults(false)
      setSubmissionStatus("none")
    }
  }, [problem, selectedLanguage])

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <p className="text-muted-foreground">The problem you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const runTests = async () => {
    setIsRunning(true)
    setShowResults(true)
    setActiveTab("results")
    setSubmissionStatus("none")

    try {
      // Get visible test cases only for running
      const visibleTestCases = problem.testCases.filter((tc) => !tc.isHidden)

      // Execute the code against test cases
      const results = await executeCode(code, selectedLanguage, visibleTestCases)
      setTestResults(results)
    } catch (error) {
      setTestResults({
        totalTests: 1,
        passedTests: 0,
        failedTests: 1,
        results: [
          {
            passed: false,
            actual: null,
            expected: null,
            runtime: 0,
            error: error instanceof Error ? error.message : "An error occurred during execution",
            testCaseNumber: 1,
          },
        ],
        firstFailedTest: 1,
        overallPassed: false,
        executionTime: 0,
      })
    } finally {
      setIsRunning(false)
    }
  }

  const submitSolution = async () => {
    setIsRunning(true)
    setShowResults(true)
    setActiveTab("results")

    try {
      // Execute against ALL test cases (visible and hidden)
      const results = await executeCode(code, selectedLanguage, problem.testCases)

      // Filter results to only show visible test cases in the UI
      const visibleTestCases = problem.testCases.filter((tc) => !tc.isHidden)
      const visibleResults = results.results.filter((_, index) => !problem.testCases[index].isHidden)

      const visibleTestResult = {
        ...results,
        results: visibleResults,
        totalTests: visibleResults.length,
        passedTests: visibleResults.filter((r) => r.passed).length,
        failedTests: visibleResults.filter((r) => !r.passed).length,
      }

      setTestResults(visibleTestResult)

      // Check if all tests passed (including hidden ones)
      const allPassed = results.overallPassed
      const visiblePassed = visibleResults.every((r) => r.passed)

      if (allPassed) {
        setSubmissionStatus("success")
      } else if (visiblePassed) {
        setSubmissionStatus("partial")
      } else {
        setSubmissionStatus("failed")
      }
    } catch (error) {
      setTestResults({
        totalTests: 1,
        passedTests: 0,
        failedTests: 1,
        results: [
          {
            passed: false,
            actual: null,
            expected: null,
            runtime: 0,
            error: error instanceof Error ? error.message : "An error occurred during execution",
            testCaseNumber: 1,
          },
        ],
        firstFailedTest: 1,
        overallPassed: false,
        executionTime: 0,
      })
      setSubmissionStatus("failed")
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(problem.starterCode[selectedLanguage])
    setTestResults(null)
    setShowResults(false)
    setSubmissionStatus("none")
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 border-r">
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold">
                {problem.id}. {problem.title}
              </h1>
              <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-line">{problem.description}</div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">Input: </span>
                            <code className="bg-muted px-1 py-0.5 rounded text-sm">{example.input}</code>
                          </div>
                          <div>
                            <span className="font-medium">Output: </span>
                            <code className="bg-muted px-1 py-0.5 rounded text-sm">{example.output}</code>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="font-medium">Explanation: </span>
                              <span className="text-sm text-muted-foreground">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Constraints</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>• {constraint}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={() => setShowSolution(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Solution
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <Select value={selectedLanguage} onValueChange={(value: any) => setSelectedLanguage(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetCode}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={runTests} disabled={isRunning}>
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? "Running..." : "Run"}
              </Button>
              <Button size="sm" onClick={submitSolution} disabled={isRunning}>
                <Send className="h-4 w-4 mr-1" />
                Submit
              </Button>
            </div>
          </div>

          {submissionStatus === "success" && (
            <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 p-2 rounded-md text-sm flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              All test cases passed! Great job!
            </div>
          )}

          {submissionStatus === "partial" && (
            <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 p-2 rounded-md text-sm flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Visible test cases passed, but some hidden test cases failed. Try to think of edge cases!
            </div>
          )}

          {submissionStatus === "failed" && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 p-2 rounded-md text-sm flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Some test cases failed. Check your solution and try again.
            </div>
          )}
        </div>

        {/* Editor and Results */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="results">
                Test Results
                {testResults && (
                  <Badge variant={testResults.overallPassed ? "default" : "destructive"} className="ml-2">
                    {testResults.passedTests}/{testResults.totalTests}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="flex-1">
              <CodeEditor language={selectedLanguage} value={code} onChange={setCode} className="h-full" />
            </TabsContent>

            <TabsContent value="results" className="flex-1">
              <DetailedTestResults
                results={testResults}
                isRunning={isRunning}
                showResults={showResults}
                hasHiddenTests={problem.testCases.some((tc) => tc.isHidden)}
                onRunTests={runTests}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Solution Modal */}
      <SolutionModal problemId={problemId} isOpen={showSolution} onClose={() => setShowSolution(false)} />
    </div>
  )
}
