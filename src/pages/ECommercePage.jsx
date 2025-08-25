"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ProductCard from "@/webComponents/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Filter, Grid3X3, List } from "lucide-react"

const products = [
  // Clothes
  { id: 1, name: "Premium Cotton T-Shirt", category: "Clothes", price: 29.99 },
  { id: 2, name: "Classic Denim Jeans", category: "Clothes", price: 79.99 },
  { id: 3, name: "Cozy Wool Sweater", category: "Clothes", price: 89.99 },
  { id: 4, name: "Elegant Summer Dress", category: "Clothes", price: 59.99 },

  // Shoes
  { id: 5, name: "Performance Running Sneakers", category: "Shoes", price: 119.99 },
  { id: 6, name: "Handcrafted Leather Boots", category: "Shoes", price: 149.99 },
  { id: 7, name: "Casual Canvas Shoes", category: "Shoes", price: 49.99 },
  { id: 8, name: "Designer High Heels", category: "Shoes", price: 89.99 },

  // Cosmetics
  { id: 9, name: "Flawless Foundation", category: "Cosmetics", price: 34.99 },
  { id: 10, name: "Luxury Lipstick Set", category: "Cosmetics", price: 24.99 },
  { id: 11, name: "Professional Eye Shadow Palette", category: "Cosmetics", price: 39.99 },
  { id: 12, name: "Hydrating Moisturizer", category: "Cosmetics", price: 19.99 },
]

export default function ECommercePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["All", "Clothes", "Shoes", "Cosmetics"]

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              E-Commerce Store
            </h1>
            <p className="text-muted-foreground mt-1">Discover amazing products at great prices</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover:shadow-md transition-all duration-200"
              >
                {category}
                {category !== "All" && (
                  <Badge variant="secondary" className="ml-2">
                    {products.filter((p) => p.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
