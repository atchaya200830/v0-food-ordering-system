"use client"

import { useState, useEffect } from "react"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"

export default function CheckoutPage() {
  const [cart, setCart] = useState([])
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }))
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newOrderId = `ORD-${Date.now()}`
      setOrderId(newOrderId)
      setOrderComplete(true)
      localStorage.setItem("foodhub-cart", JSON.stringify([]))
      setIsSubmitting(false)
    }, 1500)
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background">
        <Header cartCount={0} />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order</p>
          <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-4 mb-6">
            <p className="text-orange-600 font-bold text-lg">{orderId}</p>
            <p className="text-orange-600 text-sm">Order ID</p>
          </div>
          <p className="text-gray-600 mb-8">
            Your food will be delivered within 30-45 minutes. You can track your order in your account.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Continue Shopping</Button>
            </Link>
            <Link href="/orders">
              <Button variant="outline">View Orders</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const deliveryFee = 3.99
  const total = subtotal + deliveryFee

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cart.length} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6">
          <ArrowLeft size={20} />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Personal Info */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => handlePaymentChange("card")}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      checked={formData.paymentMethod === "cash"}
                      onChange={() => handlePaymentChange("cash")}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>
              </Card>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Review */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Review</h2>

                {/* Items */}
                <div className="max-h-64 overflow-y-auto mb-6 pb-6 border-b space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">x{item.quantity || 1}</p>
                      </div>
                      <p className="font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Card className="p-3 bg-green-50 border-green-200">
                  <p className="text-sm text-green-900">✓ Free delivery on orders over $50</p>
                </Card>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
