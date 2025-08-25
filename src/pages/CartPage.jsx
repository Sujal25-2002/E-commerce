"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CartGrid from "@/webComponents/CartGrid"
import CheckoutDialog from "@/webComponents/CheckoutDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const navigate = useNavigate()
  const { items, total } = useSelector((state) => state.cart)
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/ecommerce")} className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Continue Shopping
          </Button>
          <div>
            <h1 className="sm:text-3xl text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground sm:text-sm text-sm">Review your items and proceed to checkout</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-7 h-12" />
              Your Items ({items.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CartGrid onCheckout={() => setShowCheckout(true)} />
          </CardContent>
        </Card>

        <CheckoutDialog open={showCheckout} onOpenChange={setShowCheckout} total={total} />
      </div>
    </div>
  )
}
