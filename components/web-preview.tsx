"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Smartphone, Monitor, Tablet, Play, AlertCircle, CheckCircle } from "lucide-react"
import { WebValidator } from "@/lib/web-validation"

interface ConsoleMessage {
  type: "log" | "error" | "warn" | "info"
  message: string
  timestamp: number
}

interface WebPreviewProps {
  files: Record<string, string>
  title: string
  onValidationResult?: (results: ValidationResult[]) => void
  requirements?: string[]
  problemId?: number
}

interface ValidationResult {
  requirement: string
  passed: boolean
  message: string
  score: number
}

export function WebPreview({ files, title, onValidationResult, requirements = [], problemId = 0 }: WebPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([])
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const addConsoleMessage = (type: ConsoleMessage["type"], message: string) => {
    setConsoleMessages((prev) => [
      ...prev,
      {
        type,
        message,
        timestamp: Date.now(),
      },
    ])
  }

  const clearConsole = () => {
    setConsoleMessages([])
  }

  const getPreviewContent = () => {
    const html = files.html || ""
    const css = files.css || ""
    const js = files.javascript || files.react || files.nodejs || ""

    // For React components, we need to handle JSX differently
    if (files.react) {
      // This is a simplified React preview - in a real implementation,
      // you'd need a proper JSX transpiler
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        ${files.css || ""}
    </style>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${files.react}
        
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(${title.includes("Counter") ? "Counter" : title.includes("Todo") ? "TodoApp" : "App"}));
    </script>
</body>
</html>
      `
    }

    // For Node.js/Express code, show a message
    if (files.nodejs) {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
            background: #f5f5f5;
            text-align: center;
        }
        .server-info {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .code-preview {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            text-align: left;
            margin-top: 20px;
            font-family: monospace;
            white-space: pre-wrap;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="server-info">
        <h2>🚀 ${title}</h2>
        <p>This is a backend/API project. The code would run on a Node.js server.</p>
        <p><strong>Validation is checking your code structure and implementation.</strong></p>
        <div class="code-preview">${files.nodejs.substring(0, 500)}...</div>
        <p><em>Check the Validation tab to see if your implementation meets the requirements.</em></p>
    </div>
</body>
</html>
      `
    }

    // Inject console capture script
    const consoleScript = `
      <script>
        // Capture console messages and send to parent
        const originalConsole = {
          log: console.log,
          error: console.error,
          warn: console.warn,
          info: console.info
        };

        ['log', 'error', 'warn', 'info'].forEach(method => {
          console[method] = function(...args) {
            originalConsole[method].apply(console, args);
            window.parent.postMessage({
              type: 'console',
              method: method,
              message: args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' ')
            }, '*');
          };
        });

        // Capture errors
        window.addEventListener('error', function(e) {
          window.parent.postMessage({
            type: 'console',
            method: 'error',
            message: \`Error: \${e.message} at line \${e.lineno}\`
          }, '*');
        });

        // Send DOM ready signal
        document.addEventListener('DOMContentLoaded', function() {
          window.parent.postMessage({
            type: 'domready'
          }, '*');
        });
      </script>
    `

    // Create a complete HTML document
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        ${css}
    </style>
    ${consoleScript}
</head>
<body>
    ${html.replace(/<script.*?<\/script>/gs, "")}
    <script>
        try {
          ${js}
        } catch (error) {
          console.error('JavaScript Error:', error.message);
        }
    </script>
</body>
</html>
    `

    return fullHtml
  }

  const validateRequirements = () => {
    if (!requirements.length) return

    // Don't validate if we haven't run the code yet
    if (!hasRun) {
      setValidationResults([])
      onValidationResult?.([])
      return
    }

    const iframe = iframeRef.current
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document

    // For backend/API projects, validate the code directly
    if (files.nodejs || files.mongodb) {
      const results = WebValidator.validate(
        problemId,
        document, // dummy document
        files.css || "",
        files.nodejs || files.mongodb || "",
        requirements,
      )
      setValidationResults(results)
      onValidationResult?.(results)
      return
    }

    if (!iframeDoc) return

    const results = WebValidator.validate(
      problemId,
      iframeDoc,
      files.css || "",
      files.javascript || files.react || "",
      requirements,
    )

    setValidationResults(results)
    onValidationResult?.(results)
  }

  const runCode = () => {
    setIsRunning(true)
    clearConsole()
    setHasRun(true)
    addConsoleMessage("info", "Running code...")

    // Reload iframe with new content
    if (iframeRef.current) {
      iframeRef.current.srcdoc = getPreviewContent()
    }

    // Validate after a short delay to allow DOM to load
    setTimeout(() => {
      validateRequirements()
      setIsRunning(false)
      addConsoleMessage("info", "Code execution completed")
    }, 1000)
  }

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console") {
        addConsoleMessage(event.data.method, event.data.message)
      } else if (event.data.type === "domready") {
        addConsoleMessage("info", "DOM loaded successfully")
        validateRequirements()
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [requirements, hasRun])

  // Don't auto-run on file changes to prevent false validations
  useEffect(() => {
    // Only initialize validation results with empty array
    if (!hasRun && validationResults.length === 0) {
      const emptyResults = requirements.map((req) => ({
        requirement: req,
        passed: false,
        message: "❌ Not implemented yet",
        score: 0,
      }))
      setValidationResults(emptyResults)
      onValidationResult?.(emptyResults)
    }
  }, [requirements, hasRun])

  const getViewportSize = () => {
    switch (viewMode) {
      case "mobile":
        return { width: "320px", height: "500px", maxWidth: "100%" }
      case "tablet":
        return { width: "768px", height: "500px", maxWidth: "100%" }
      default:
        return { width: "100%", height: "500px", maxWidth: "100%" }
    }
  }

  const openInNewWindow = () => {
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(getPreviewContent())
      newWindow.document.close()
    }
  }

  const getConsoleMessageColor = (type: ConsoleMessage["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400"
      case "warn":
        return "text-yellow-400"
      case "info":
        return "text-blue-400"
      default:
        return "text-green-400"
    }
  }

  const totalScore = validationResults.reduce((sum, result) => sum + result.score, 0)
  const passedCount = validationResults.filter((r) => r.passed).length

  return (
    <div className="h-full flex flex-col min-h-[50vh] lg:min-h-[calc(100vh-4rem)]">
      <Card className="flex-1 flex flex-col h-full">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-base lg:text-lg">Live Preview & Console</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("desktop")}
                  className="rounded-r-none px-2"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("tablet")}
                  className="rounded-none border-x px-2"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("mobile")}
                  className="rounded-l-none px-2"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="default" size="sm" onClick={runCode} disabled={isRunning}>
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button variant="outline" size="sm" onClick={openInNewWindow}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Open
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <Tabs defaultValue="preview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-3 lg:mx-4 mt-2 lg:mt-4">
              <TabsTrigger value="preview" className="text-xs lg:text-sm">
                Preview
              </TabsTrigger>
              <TabsTrigger value="console" className="text-xs lg:text-sm">
                Console
              </TabsTrigger>
              <TabsTrigger value="validation" className="text-xs lg:text-sm">
                Validation{" "}
                {validationResults.length > 0 && (
                  <Badge
                    variant={passedCount === validationResults.length ? "default" : "destructive"}
                    className="ml-1 lg:ml-2 text-xs"
                  >
                    {passedCount}/{validationResults.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 m-2 lg:m-4 mt-2 overflow-hidden">
              <div className="flex justify-center bg-gray-100 dark:bg-gray-800 p-2 lg:p-4 rounded-lg h-full min-h-[300px] lg:min-h-[400px]">
                <div
                  className="bg-white border rounded-lg overflow-hidden shadow-lg transition-all duration-300 relative"
                  style={getViewportSize()}
                >
                  <iframe
                    ref={iframeRef}
                    srcDoc={hasRun ? getPreviewContent() : ""}
                    className="w-full h-full border-0"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  {!hasRun && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="text-center p-4">
                        <Play className="h-8 lg:h-12 w-8 lg:w-12 mx-auto mb-2 lg:mb-4 text-gray-400" />
                        <p className="text-sm lg:text-lg font-medium text-gray-600">Preview Area</p>
                        <Button size="sm" className="mt-2 lg:mt-4" onClick={runCode}>
                          <Play className="h-4 w-4 mr-2" />
                          Run Code
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="console" className="flex-1 m-2 lg:m-4 mt-2">
              <div className="bg-black text-green-400 p-3 lg:p-4 rounded-lg h-full font-mono text-xs lg:text-sm min-h-[300px] lg:min-h-[400px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm lg:text-base">Console Output</span>
                  <Button variant="outline" size="sm" onClick={clearConsole}>
                    Clear
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100%-40px)]">
                  <div className="space-y-1">
                    {!hasRun ? (
                      <div className="text-gray-500">Click "Run Code" to see console output.</div>
                    ) : consoleMessages.length === 0 ? (
                      <div className="text-gray-500">
                        No console output yet. Add console.log() statements to your code.
                      </div>
                    ) : (
                      consoleMessages.map((msg, index) => (
                        <div key={index} className={`${getConsoleMessageColor(msg.type)} break-words`}>
                          <span className="text-gray-400">[{new Date(msg.timestamp).toLocaleTimeString()}]</span>{" "}
                          <span className="uppercase text-xs">[{msg.type}]</span> {msg.message}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="validation" className="flex-1 m-2 lg:m-4 mt-2">
              <div className="space-y-4 h-full min-h-[300px] lg:min-h-[400px]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm lg:text-base">Requirement Validation</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={passedCount === validationResults.length && passedCount > 0 ? "default" : "destructive"}
                    >
                      {passedCount}/{validationResults.length} Passed
                    </Badge>
                    {totalScore > 0 && <Badge variant="outline">{totalScore} pts</Badge>}
                  </div>
                </div>

                <ScrollArea className="h-[calc(100%-60px)]">
                  <div className="space-y-3">
                    {validationResults.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        Run your code to see validation results
                      </div>
                    ) : (
                      validationResults.map((result, index) => (
                        <Card
                          key={index}
                          className={`border-l-4 ${result.passed ? "border-l-green-500" : "border-l-red-500"}`}
                        >
                          <CardContent className="p-3 lg:p-4">
                            <div className="flex items-start gap-3">
                              {result.passed ? (
                                <CheckCircle className="h-4 lg:h-5 w-4 lg:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="h-4 lg:h-5 w-4 lg:w-5 text-red-600 mt-0.5 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-xs lg:text-sm mb-1 break-words">
                                  {result.requirement}
                                </div>
                                <div
                                  className={`text-xs ${result.passed ? "text-green-600" : "text-red-600"} break-words`}
                                >
                                  {result.message}
                                  {result.score > 0 && <span className="ml-2 font-medium">+{result.score} pts</span>}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
