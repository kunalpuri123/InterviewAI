"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Skeleton } from "@/components/ui/skeleton"

interface MonacoEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  className?: string
  options?: any
}

declare global {
  interface Window {
    monaco: any
    require: any
    MonacoEnvironment: any
  }
}

export function MonacoEditor({ language, value, onChange, className, options = {} }: MonacoEditorProps) {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Load Monaco Editor from CDN
    const loadMonaco = async () => {
      if (window.monaco) {
        setIsReady(true)
        setIsLoading(false)
        return
      }

      try {
        // Set up Monaco environment
        window.MonacoEnvironment = {
          getWorkerUrl: (workerId: string, label: string) =>
            `data:text/javascript;charset=utf-8,${encodeURIComponent(`
              self.MonacoEnvironment = {
                baseUrl: 'https://unpkg.com/monaco-editor@0.45.0/min/'
              };
              importScripts('https://unpkg.com/monaco-editor@0.45.0/min/vs/base/worker/workerMain.js');
            `)}`,
        }

        // Load Monaco Editor
        const script = document.createElement("script")
        script.src = "https://unpkg.com/monaco-editor@0.45.0/min/vs/loader.js"
        script.onload = () => {
          window.require.config({
            paths: {
              vs: "https://unpkg.com/monaco-editor@0.45.0/min/vs",
            },
          })

          window.require(["vs/editor/editor.main"], () => {
            setIsReady(true)
            setIsLoading(false)
          })
        }
        script.onerror = () => {
          console.error("Failed to load Monaco Editor")
          setIsLoading(false)
        }

        document.head.appendChild(script)
      } catch (error) {
        console.error("Failed to load Monaco Editor:", error)
        setIsLoading(false)
      }
    }

    loadMonaco()
  }, [])

  useEffect(() => {
    if (!isReady || !containerRef.current || !window.monaco) return

    // Create editor instance
    const editor = window.monaco.editor.create(containerRef.current, {
      value,
      language: getMonacoLanguage(language),
      theme: theme === "dark" ? "vs-dark" : "vs",
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: false,
      scrollbar: {
        vertical: "visible",
        horizontal: "visible",
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
      wordWrap: "off",
      tabSize: 2,
      insertSpaces: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      glyphMargin: false,
      ...options,
    })

    editorRef.current = editor

    // Listen for content changes
    const disposable = editor.onDidChangeModelContent(() => {
      const newValue = editor.getValue()
      onChange(newValue)
    })

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      editor.layout()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      disposable.dispose()
      resizeObserver.disconnect()
      editor.dispose()
    }
  }, [isReady, theme, options])

  // Update editor value when prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      const editor = editorRef.current
      const model = editor.getModel()
      if (model) {
        editor.pushUndoStop()
        model.setValue(value)
        editor.pushUndoStop()
      }
    }
  }, [value])

  // Update editor language when prop changes
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      const model = editorRef.current.getModel()
      if (model) {
        window.monaco.editor.setModelLanguage(model, getMonacoLanguage(language))
      }
    }
  }, [language])

  // Update theme when it changes
  useEffect(() => {
    if (window.monaco && isReady) {
      window.monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs")
    }
  }, [theme, isReady])

  const getMonacoLanguage = (lang: string) => {
    const languageMap: Record<string, string> = {
      javascript: "javascript",
      python: "python",
      java: "java",
      html: "html",
      css: "css",
      json: "json",
      typescript: "typescript",
      jsx: "javascript",
      tsx: "typescript",
    }
    return languageMap[lang] || "javascript"
  }

  if (isLoading) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="space-y-4 w-full h-full p-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-2/3" />
          <div className="text-center text-sm text-muted-foreground mt-4">Loading Monaco Editor...</div>
        </div>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-lg font-medium text-muted-foreground">Failed to load editor</div>
          <div className="text-sm text-muted-foreground">Please refresh the page to try again</div>
        </div>
      </div>
    )
  }

  return <div ref={containerRef} className={`w-full h-full ${className}`} />
}
