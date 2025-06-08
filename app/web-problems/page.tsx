"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { webProblems, getCategoryColor, getDifficultyColor } from "@/lib/web-problems"
import { Search, Clock, Target } from "lucide-react"

export default function WebProblemsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredProblems = webProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || problem.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const allCategories = Array.from(new Set(webProblems.map((p) => p.category)))
  const allDifficulties = Array.from(new Set(webProblems.map((p) => p.difficulty)))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Web Development Challenges</h1>
        <p className="text-muted-foreground mb-6">
          Practice building real-world web applications with MERN stack challenges and mini-projects.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search web dev challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              {allDifficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid gap-6">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <Badge className={getCategoryColor(problem.category)}>{problem.category}</Badge>
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{problem.description}</CardDescription>
                </div>
                <Button asChild>
                  <Link href={`/web-problems/${problem.id}`}>Start Project</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {problem.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {problem.requirements.length} requirements
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Learning Objectives:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {problem.learningObjectives.slice(0, 2).map((objective, index) => (
                      <li key={index}>• {objective}</li>
                    ))}
                    {problem.learningObjectives.length > 2 && (
                      <li className="text-xs">+ {problem.learningObjectives.length - 2} more...</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No web development challenges found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
