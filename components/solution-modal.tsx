"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sampleSolutions } from "@/lib/sample-solutions"

interface SolutionModalProps {
  problemId: number
  isOpen: boolean
  onClose: () => void
}

export function SolutionModal({ problemId, isOpen, onClose }: SolutionModalProps) {
  const [language, setLanguage] = useState("javascript")

  const solution = sampleSolutions[problemId as keyof typeof sampleSolutions]

  if (!solution) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
          <DialogDescription>
            Here's a sample solution for this problem. Try to understand the approach before looking at the code.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={language} onValueChange={setLanguage} className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>

          <TabsContent value="javascript" className="mt-4">
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-sm">
              <code>{solution.javascript}</code>
            </pre>
          </TabsContent>

          <TabsContent value="python" className="mt-4">
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-sm">
              <code>{solution.python}</code>
            </pre>
          </TabsContent>

          <TabsContent value="java" className="mt-4">
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-sm">
              <code>{solution.java}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
