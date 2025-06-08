interface ExecutionResult {
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
  results: ExecutionResult[]
  firstFailedTest?: number
  overallPassed: boolean
  executionTime: number
}

export async function executeJavaScript(code: string, testCases: any[]): Promise<DetailedTestResult> {
  const results: ExecutionResult[] = []
  const startTime = performance.now()
  let firstFailedTest: number | undefined

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    const testStartTime = performance.now()
    let result: ExecutionResult = {
      passed: false,
      actual: null,
      expected: testCase.expected,
      runtime: 0,
      input: testCase.input,
      testCaseNumber: i + 1,
    }

    try {
      // Extract function name from the code
      const functionNameMatch = code.match(/var\s+(\w+)\s*=\s*function|function\s+(\w+)\s*\(/)
      const functionName = functionNameMatch ? functionNameMatch[1] || functionNameMatch[2] : null

      if (!functionName) {
        throw new Error("Could not identify function name in your code")
      }

      // Create a safe execution environment
      const executionFunction = new Function(
        "testCase",
        `
        ${code}
        try {
          return { result: ${functionName}(...testCase.input), error: null };
        } catch (error) {
          return { result: null, error: error.message };
        }
        `,
      )

      const { result: executionResult, error } = executionFunction(testCase)

      if (error) {
        throw new Error(error)
      }

      // Compare results with better equality checking
      const testEndTime = performance.now()
      const runtime = Math.round(testEndTime - testStartTime)

      // Improved equality checking
      const isEqual = (a: any, b: any) => {
        // Handle null/undefined cases
        if (a === null && b === null) return true
        if (a === undefined && b === undefined) return true
        if (a === null || b === null || a === undefined || b === undefined) return false

        // Handle primitive types
        if (typeof a !== "object" && typeof b !== "object") {
          return a === b
        }

        // Handle arrays
        if (Array.isArray(a) && Array.isArray(b)) {
          if (a.length !== b.length) return false

          // For problems like Two Sum where order might not matter
          // Check if it's a simple array of numbers/indices
          if (a.length === 2 && b.length === 2 && typeof a[0] === "number" && typeof b[0] === "number") {
            // Sort both arrays and compare
            const sortedA = [...a].sort((x, y) => x - y)
            const sortedB = [...b].sort((x, y) => x - y)
            return sortedA[0] === sortedB[0] && sortedA[1] === sortedB[1]
          }

          // For other arrays, check element by element
          for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) return false
          }
          return true
        }

        // Handle objects
        if (typeof a === "object" && typeof b === "object") {
          const keysA = Object.keys(a)
          const keysB = Object.keys(b)

          if (keysA.length !== keysB.length) return false

          for (const key of keysA) {
            if (!keysB.includes(key)) return false
            if (!isEqual(a[key], b[key])) return false
          }
          return true
        }

        return false
      }

      const passed = isEqual(executionResult, testCase.expected)

      result = {
        passed,
        actual: executionResult,
        expected: testCase.expected,
        runtime,
        input: testCase.input,
        testCaseNumber: i + 1,
      }

      // Track first failed test
      if (!passed && firstFailedTest === undefined) {
        firstFailedTest = i + 1
      }
    } catch (error) {
      const testEndTime = performance.now()
      result = {
        passed: false,
        actual: null,
        expected: testCase.expected,
        runtime: Math.round(testEndTime - testStartTime),
        error: error instanceof Error ? error.message : String(error),
        input: testCase.input,
        testCaseNumber: i + 1,
      }

      // Track first failed test
      if (firstFailedTest === undefined) {
        firstFailedTest = i + 1
      }
    }

    results.push(result)
  }

  const endTime = performance.now()
  const totalExecutionTime = Math.round(endTime - startTime)
  const passedTests = results.filter((r) => r.passed).length
  const failedTests = results.length - passedTests

  return {
    totalTests: testCases.length,
    passedTests,
    failedTests,
    results,
    firstFailedTest,
    overallPassed: passedTests === testCases.length,
    executionTime: totalExecutionTime,
  }
}

export async function executePython(code: string, testCases: any[]): Promise<DetailedTestResult> {
  // In a real implementation, this would execute Python code
  // For this demo, we'll simulate Python execution with a message
  const results = testCases.map((testCase, index) => ({
    passed: false,
    actual: null,
    expected: testCase.expected,
    runtime: 0,
    error: "Python execution is not available in this demo. Please use JavaScript.",
    input: testCase.input,
    testCaseNumber: index + 1,
  }))

  return {
    totalTests: testCases.length,
    passedTests: 0,
    failedTests: testCases.length,
    results,
    firstFailedTest: 1,
    overallPassed: false,
    executionTime: 0,
  }
}

export async function executeJava(code: string, testCases: any[]): Promise<DetailedTestResult> {
  // In a real implementation, this would execute Java code
  // For this demo, we'll simulate Java execution with a message
  const results = testCases.map((testCase, index) => ({
    passed: false,
    actual: null,
    expected: testCase.expected,
    runtime: 0,
    error: "Java execution is not available in this demo. Please use JavaScript.",
    input: testCase.input,
    testCaseNumber: index + 1,
  }))

  return {
    totalTests: testCases.length,
    passedTests: 0,
    failedTests: testCases.length,
    results,
    firstFailedTest: 1,
    overallPassed: false,
    executionTime: 0,
  }
}

export async function executeCode(code: string, language: string, testCases: any[]): Promise<DetailedTestResult> {
  switch (language) {
    case "javascript":
      return executeJavaScript(code, testCases)
    case "python":
      return executePython(code, testCases)
    case "java":
      return executeJava(code, testCases)
    default:
      throw new Error(`Unsupported language: ${language}`)
  }
}
