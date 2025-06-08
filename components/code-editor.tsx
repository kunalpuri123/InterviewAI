"use client"

import { MonacoEditor } from "./monaco-editor"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CodeEditor({ language, value, onChange, className }: CodeEditorProps) {
  return (
    <div className={`relative ${className}`}>
      <MonacoEditor
        language={language}
        value={value}
        onChange={onChange}
        className="w-full h-full"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: "off",
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: false,
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </div>
  )
}
