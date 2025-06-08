"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Loader2, AlertCircle, Lock, Play } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface TestResult {
  passed: boolean
  actual: any
  expected: any
  runtime: number
  error?: string
  input?: any[]
  testCaseNumber?: number
}

interface DetailedTestResult {
  totalTests: number
  passedTests: number
  failedTests: number
  results: TestResult[]
  firstFailedTest?: number
  overallPassed: boolean
  executionTime: number
}

interface DetailedTestResultsProps {
  results: DetailedTestResult | null
  isRunning: boolean
  showResults: boolean
  hasHiddenTests?: boolean
  onRunTests?: () => void
}

export function DetailedTestResults({
  results,
  isRunning,
  showResults,
  hasHiddenTests,
  onRunTests,
}: DetailedTestResultsProps) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Running test cases...</p>
        </div>
      </div>
    )
  }

  if (!showResults || !results) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Play className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-muted-foreground mb-4">Run your code to see test results</p>
          {onRunTests && (
            <Button onClick={onRunTests}>
              <Play className="h-4 w-4 mr-2" />
              Run Tests
            </Button>
          )}
        </div>
      </div>
    )
  }

  // Check if there's a compilation/runtime error
  const hasCompilationError = results.results.some((r) => r.error && r.testCaseNumber === 1)

  if (hasCompilationError) {
    const errorResult = results.results.find((r) => r.error)
    return (
      <div className="h-full p-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium mb-2">Compilation Error</div>
            <div className="text-sm">{errorResult?.error}</div>
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground">Fix the error and try again.</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with overall results */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Test Results</h3>
          <div className="flex items-center gap-2">
            <Badge variant={results.overallPassed ? "default" : "destructive"}>
              {results.passedTests}/{results.totalTests} Passed
            </Badge>
            <Badge variant="outline">{results.executionTime}ms</Badge>
          </div>
        </div>

        {/* Overall status */}
        {results.overallPassed ? (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <div className="font-medium">All test cases passed! 🎉</div>
              <div className="text-sm">Your solution is correct.</div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium">
                {results.failedTests} test case{results.failedTests > 1 ? "s" : ""} failed
              </div>
              <div className="text-sm">First failed test case: #{results.firstFailedTest}</div>
            </AlertDescription>
          </Alert>
        )}

        {hasHiddenTests && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            Additional hidden test cases will be checked on submission
          </p>
        )}
      </div>

      {/* Detailed test results */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {results.results.map((result, index) => (
            <Card
              key={index}
              className={`border-l-4 ${
                result.passed
                  ? "border-l-green-500 bg-green-50/50 dark:bg-green-900/10"
                  : "border-l-red-500 bg-red-50/50 dark:bg-red-900/10"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    Test Case {result.testCaseNumber}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {result.runtime}ms
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 text-sm">
                  {/* Input */}
                  {result.input && (
                    <div>
                      <span className="font-medium text-muted-foreground">Input:</span>
                      <div className="bg-muted/50 p-2 rounded mt-1 font-mono text-xs">
                        {Array.isArray(result.input)
                          ? result.input.map((inp) => JSON.stringify(inp)).join(", ")
                          : JSON.stringify(result.input)}
                      </div>
                    </div>
                  )}

                  {/* Expected Output */}
                  <div>
                    <span className="font-medium text-muted-foreground">Expected:</span>
                    <div className="bg-muted/50 p-2 rounded mt-1 font-mono text-xs">
                      {JSON.stringify(result.expected)}
                    </div>
                  </div>

                  {/* Actual Output */}
                  <div>
                    <span className="font-medium text-muted-foreground">Your Output:</span>
                    <div
                      className={`p-2 rounded mt-1 font-mono text-xs ${
                        result.passed
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                      }`}
                    >
                      {result.error ? (
                        <span className="text-red-600">Error: {result.error}</span>
                      ) : (
                        JSON.stringify(result.actual)
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-2 border-t">
                    <span className={`text-xs font-medium ${result.passed ? "text-green-600" : "text-red-600"}`}>
                      {result.passed ? "✓ PASSED" : "✗ FAILED"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
