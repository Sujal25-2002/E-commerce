"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Trash2, Clock, AlertTriangle, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TaskItem({ task, onToggle, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "low":
        return "🟢"
      default:
        return "⚪"
    }
  }

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date()

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-md border-0 shadow-sm",
        task.completed
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500"
          : isOverdue
            ? "bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-l-red-500"
            : "bg-white hover:shadow-lg hover:-translate-y-0.5",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Button
              variant={task.completed ? "default" : "outline"}
              size="icon"
              onClick={() => onToggle(task.id)}
              className={cn(
                "h-10 w-10 rounded-full transition-all duration-200 flex-shrink-0",
                task.completed
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                  : "hover:bg-green-50 hover:border-green-300",
              )}
            >
              <Check size={18} />
            </Button>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={cn(
                    "text-lg font-semibold transition-all duration-200",
                    task.completed && "line-through text-muted-foreground",
                  )}
                >
                  {task.title}
                </span>
                <Badge className={getPriorityColor(task.priority)}>
                  {getPriorityIcon(task.priority)} {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive" className="animate-pulse">
                    <AlertTriangle size={12} className="mr-1" />
                    Overdue
                  </Badge>
                )}
              </div>

              {task.description && (
                <p className={cn("text-sm text-muted-foreground leading-relaxed", task.completed && "line-through")}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>Created {formatDate(task.createdAt)}</span>
                </div>

                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {task.estimatedHours && (
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{task.estimatedHours}h estimated</span>
                  </div>
                )}

                {task.dependencies && (
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>Depends on: {task.dependencies}</span>
                  </div>
                )}

                {task.completed && task.completedAt && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    ✅ Completed {formatDate(task.completedAt)}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-1 hover:shadow-md transition-all duration-200 flex-shrink-0"
          >
            <Trash2 size={10} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
