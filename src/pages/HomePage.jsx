import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, CheckSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to React Vite App</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern application featuring e-commerce functionality with Redux state management and a task manager with
            localStorage persistence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <CardTitle>E-Commerce Module</CardTitle>
              </div>
              <CardDescription>
                Browse products, add items to cart, and manage your shopping experience with AG Grid integration and
                Redux state management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Browse Clothes, Shoes, and Cosmetics</li>
                <li>• Add items to cart with quantity management</li>
                <li>• View cart in AG Grid table format</li>
                <li>• Redux state management</li>
              </ul>
              <Link to="/ecommerce">
                <Button className="w-full">Explore E-Commerce</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckSquare className="h-8 w-8 text-green-600" />
                <CardTitle>Task Manager</CardTitle>
              </div>
              <CardDescription>
                Organize your tasks with add, complete, and delete functionality. All tasks persist in localStorage
                across browser sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Add new tasks quickly</li>
                <li>• Mark tasks as completed</li>
                <li>• Delete unwanted tasks</li>
                <li>• LocalStorage persistence</li>
              </ul>
              <Link to="/tasks">
                <Button className="w-full">Manage Tasks</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
