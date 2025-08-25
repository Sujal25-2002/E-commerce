"use client"

import { useState, useEffect } from "react"
import TaskItem from "@/webComponents/TaskItem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, CheckCircle, Clock, Target, AlertTriangle, Calendar } from "lucide-react"

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    estimatedHours: "",
    dueDate: "",
    dependencies: "",
  })

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        priority: newTask.priority,
        estimatedHours: newTask.estimatedHours ? Number.parseInt(newTask.estimatedHours) : null,
        dueDate: newTask.dueDate || null,
        dependencies: newTask.dependencies.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      }
      setTasks([...tasks, task])
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        estimatedHours: "",
        dueDate: "",
        dependencies: "",
      })
    }
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length
  const pendingCount = totalCount - completedCount
  const highPriorityCount = tasks.filter((task) => task.priority === "high" && !task.completed).length
  const overdueCount = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false
    return new Date(task.dueDate) < new Date()
  }).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Advanced Task Manager
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive task management with priorities, deadlines, and dependencies
          </p>
        </div>

        {totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-600">{overdueCount}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-8 h-8" />
              Create New Task
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Low Priority</SelectItem>
                    <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                    <SelectItem value="high">🔴 High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the task in detail..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Hours"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({ ...newTask, estimatedHours: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dependencies">Dependencies</Label>
                <Input
                  id="dependencies"
                  placeholder="Task dependencies..."
                  value={newTask.dependencies}
                  onChange={(e) => setNewTask({ ...newTask, dependencies: e.target.value })}
                />
              </div>
            </div>

            <Button
              onClick={addTask}
              className="w-full h-12 text-lg font-semibold hover:shadow-lg transition-all duration-200"
              disabled={!newTask.title.trim()}
            >
              <Plus size={20} className="mr-2" />
              Create Task
            </Button>
          </CardContent>
        </Card>

        {totalCount > 0 && (
          <Card className="mb-6 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Progress</span>
                <Badge variant="outline" className="text-sm">
                  {completedCount} of {totalCount} completed
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {completedCount === totalCount && totalCount > 0
                  ? "🎉 All tasks completed! Great job!"
                  : `${Math.round((completedCount / totalCount) * 100)}% complete`}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground">
                  Add your first task above to get started on your productivity journey!
                </p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />)
          )}
        </div>
      </div>
    </div>
  )
}
