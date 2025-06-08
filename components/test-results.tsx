"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Loader2, AlertCircle, Lock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TestResult {
  id?: number
  input?: any[]
  expected: any
  actual: any
  passed: boolean
  runtime: number
  error?: string
}

interface TestResultsProps {
  results: TestResult[]
  isRunning: boolean
  showResults: boolean
  hasHiddenTests?: boolean
}

export function TestResults({ results, isRunning, showResults, hasHiddenTests }: TestResultsProps) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Running tests...</p>
        </div>
      </div>
    )
  }

  if (!showResults || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">Run your code to see test results</p>
        </div>
      </div>
    )
  }

  // Check if there's an error in any test result
  const hasError = results.some((r) => r.error)

  if (hasError) {
    const errorResult = results.find((r) => r.error)
    return (
      <div className="h-full p-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Error: {errorResult?.error}</AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground">Fix the error and try again.</p>
      </div>
    )
  }

  const passedTests = results.filter((r) => r.passed).length
  const totalTests = results.length

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Test Results</h3>
          <Badge variant={passedTests === totalTests ? "default" : "destructive"}>
            {passedTests}/{totalTests} Passed
          </Badge>
        </div>
        {hasHiddenTests && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            Additional hidden test cases will be checked on submission
          </p>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {results.map((result, index) => (
            <Card key={index} className={result.passed ? "border-green-200" : "border-red-200"}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    Test Case {index + 1}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {result.runtime}ms
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  {result.input && (
                    <div>
                      <span className="font-medium">Input: </span>
                      <code className="bg-muted px-1 py-0.5 rounded">{JSON.stringify(result.input)}</code>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Expected: </span>
                    <code className="bg-muted px-1 py-0.5 rounded">{JSON.stringify(result.expected)}</code>
                  </div>
                  <div>
                    <span className="font-medium">Your Output: </span>
                    <code
                      className={`px-1 py-0.5 rounded ${
                        result.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {JSON.stringify(result.actual)}
                    </code>
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
