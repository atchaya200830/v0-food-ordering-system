"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import { CartItem } from "@/components/cart-item"

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [deliveryFee] = useState(3.99)
  const [discountCode, setDiscountCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (updatedCart) => {
    setCart(updatedCart)
    localStorage.setItem("foodhub-cart", JSON.stringify(updatedCart))
  }

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId)
    } else {
      updateCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const handleRemoveItem = (itemId) => {
    updateCart(cart.filter((item) => item.id !== itemId))
  }

  const handleApplyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscount(0.1)
    } else if (discountCode === "SAVE20") {
      setDiscount(0.2)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const discountAmount = subtotal * discount
  const total = subtotal + deliveryFee - discountAmount

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cart.length} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>

        {cart.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Menu</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
              <Card className="p-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(qty) => handleUpdateQuantity(item.id, qty)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  {/* Discount Code */}
                  <div className="mb-6 pb-6 border-b">
                    <label className="block text-sm font-medium mb-2">Discount Code</label>
                    <div className="flex gap-2">
                      <Input
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1"
                      />
                      <Button onClick={handleApplyDiscount} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Try: SAVE10 or SAVE20</p>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </Card>

                {/* Info Card */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Free delivery</span> on orders over $50
                  </p>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
