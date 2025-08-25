"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "@/store/cartSlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react"
import Confetti from "react-confetti"

const steps = [
  { id: 1, title: "Personal & Address", icon: "👤" },
  { id: 2, title: "Payment Method", icon: "💳" },
  { id: 3, title: "Order Confirmation", icon: "✅" },
]

export default function CheckoutDialog({ open, onOpenChange, total }) {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Personal Details & Address
    name: "",
    mobile: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    // Step 2: Payment
    paymentMethod: "",
  })

  const handleInputChange = (field, value) => {
    if (field === "mobile") {
      // Only allow digits and max 10 characters
      const cleanValue = value.replace(/\D/g, "").slice(0, 10)
      setFormData((prev) => ({ ...prev, [field]: cleanValue }))
    } else if (field === "name") {
      // Only allow letters and spaces
      const cleanValue = value.replace(/[^a-zA-Z\s]/g, "")
      setFormData((prev) => ({ ...prev, [field]: cleanValue }))
    } else if (field === "pincode") {
      // Only allow digits and max 6 characters
      const cleanValue = value.replace(/\D/g, "").slice(0, 6)
      setFormData((prev) => ({ ...prev, [field]: cleanValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 2) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    if (currentStep === 3) {
      dispatch(clearCart())
    }
    setCurrentStep(1)
    setShowConfetti(false)
    onOpenChange(false)
  }

  const getEstimatedDelivery = () => {
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + (formData.paymentMethod === "cod" ? 5 : 3))
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name.trim() &&
          formData.mobile.trim() &&
          formData.mobile.length === 10 &&
          formData.addressLine1.trim() &&
          formData.city.trim() &&
          formData.state.trim() &&
          formData.pincode.trim() &&
          formData.pincode.length >= 5
        )
      case 2:
        return formData.paymentMethod
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="10-digit mobile number"
                  className="mt-1"
                  maxLength={10}
                />
                {formData.mobile && formData.mobile.length < 10 && (
                  <p className="text-xs text-red-500 mt-1">Mobile number must be 10 digits</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address Line 1 *</Label>
              <Input
                id="address"
                value={formData.addressLine1}
                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                placeholder="House no, Building, Street"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="Pincode"
                  className="mt-1"
                  maxLength={6}
                />
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) => handleInputChange("landmark", e.target.value)}
                  placeholder="Landmark (optional)"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4 p-1">
            <div className="grid gap-4">
              <Card
                className={`cursor-pointer transition-all ${formData.paymentMethod === "cod" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
                onClick={() => handleInputChange("paymentMethod", "cod")}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                  </div>
                  <Badge variant="secondary">5-7 days</Badge>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${formData.paymentMethod === "upi" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
                onClick={() => handleInputChange("paymentMethod", "upi")}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold">UPI Payment</h3>
                    <p className="text-sm text-muted-foreground">Pay instantly with UPI</p>
                  </div>
                  <Badge variant="secondary">3-5 days</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h3>
              <p className="text-muted-foreground">Thank you for your purchase</p>
            </div>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="capitalize">
                      {formData.paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="font-semibold text-green-600">{getEstimatedDelivery()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="w-[95vw] sm:w-full sm:max-w-4xl h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6">
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              <Confetti 
                width={window?.innerWidth || 1200} 
                height={window?.innerHeight || 800}
                recycle={false}
                numberOfPieces={200}
              />
            </div>
          )}
          
          <DialogHeader className="flex-shrink-0 pb-2 sm:pb-4">
            <DialogTitle className="text-lg sm:text-2xl font-bold text-center sm:text-left">Checkout</DialogTitle>
          </DialogHeader>

          <div className="flex-shrink-0 mb-4 sm:mb-6">
            <div className="flex items-center justify-center px-2">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                        currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="ml-1 sm:ml-2 hidden sm:block">
                      <p
                        className={`text-xs sm:text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-3 sm:w-8 lg:w-12 h-0.5 mx-1 sm:mx-2 lg:mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 sm:mb-6">{renderStepContent()}</div>

          <div className="flex-shrink-0 pt-3 sm:pt-4 border-t">
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
              <Button
                variant="outline"
                onClick={currentStep === 3 ? handleClose : handleBack}
                disabled={currentStep === 1}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent"
              >
                {currentStep === 3 ? (
                  "Close"
                ) : (
                  <>
                    <ArrowLeft size={16} />
                    Back
                  </>
                )}
              </Button>

              {currentStep < 3 && (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {currentStep === 2 ? "Place Order" : "Next"}
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}