import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { ShoppingCart, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Navigation() {
  const location = useLocation()
  const { items } = useSelector((state) => state.cart)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg sm:text-xl font-bold text-gray-900">
              React Vite App
            </Link>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/ecommerce">
              <Button
                variant={location.pathname === "/ecommerce" ? "default" : "ghost"}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-sm"
                size="sm"
              >
                <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">E-Commerce</span>
                <span className="sm:hidden">Shop</span>
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                variant={location.pathname === "/cart" ? "default" : "ghost"}
                className="flex items-center gap-1 sm:gap-2 relative px-2 sm:px-4 text-sm"
                size="sm"
              >
                <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Cart</span>
                {items.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {items.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/tasks">
              <Button
                variant={location.pathname === "/tasks" ? "default" : "ghost"}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-sm"
                size="sm"
              >
                <CheckSquare size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Task Manager</span>
                <span className="sm:hidden">Tasks</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
