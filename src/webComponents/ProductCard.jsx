"use client"

import { useDispatch } from "react-redux"
import { addToCart } from "@/store/cartSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"

export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    const button = document.activeElement
    if (button) {
      button.style.transform = "scale(0.95)"
      setTimeout(() => {
        button.style.transform = "scale(1)"
      }, 150)
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Clothes":
        return "bg-blue-100 text-blue-800"
      case "Shoes":
        return "bg-green-100 text-green-800"
      case "Cosmetics":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProductImage = (productName, category) => {
    const imageMap = {
      "Premium Cotton T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "Classic Denim Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      "Cozy Wool Sweater": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
      "Elegant Summer Dress": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      "Performance Running Sneakers": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      "Handcrafted Leather Boots": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
      "Casual Canvas Shoes": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
      "Designer High Heels": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      "Flawless Foundation": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
      "Luxury Lipstick Set": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
      "Professional Eye Shadow Palette":
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
      "Hydrating Moisturizer": "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
    }
    return imageMap[productName] || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop`
  }

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={getProductImage(product.name, product.category) || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge className={getCategoryColor(product.category)}>{product.category}</Badge>
          </div>
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">4.5</span>
          </div>
        </div>
        <div className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">${product.price}</p>
          <p className="text-sm text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</p>
        </div>
        <p className="text-xs text-green-600 font-medium mt-1">Free shipping</p>
      </CardContent>

      <CardFooter className="p-4 pt-2">
        <Button
          onClick={handleAddToCart}
          className="w-full flex items-center gap-2 hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
