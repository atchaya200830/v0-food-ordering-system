"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Clock, CheckCircle, Truck, UtensilsCrossed, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Link from "next/link"

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("")
  const [order, setOrder] = useState(null)
  const [cart, setCart] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const handleTrackOrder = (e) => {
    e.preventDefault()
    setError("")

    // Mock tracking data
    const mockOrders = {
      "ORD-1698765432100": {
        id: "ORD-1698765432100",
        status: "out-for-delivery",
        customer: "John Doe",
        items: [
          { name: "Margherita Pizza", quantity: 2, price: 12.99 },
          { name: "Garlic Bread", quantity: 1, price: 4.99 },
        ],
        total: 45.97,
        orderedAt: "2024-11-30 2:30 PM",
        estimatedDelivery: "3:15 PM - 3:45 PM",
        deliveryAddress: "123 Main Street, New York, NY 10001",
        driverName: "Mike Johnson",
        driverPhone: "+1 (555) 987-6543",
        driverRating: 4.8,
      },
      "ORD-1698765432101": {
        id: "ORD-1698765432101",
        status: "preparing",
        customer: "Jane Smith",
        items: [
          { name: "Pepperoni Pizza", quantity: 1, price: 13.99 },
          { name: "Caesar Salad", quantity: 2, price: 8.99 },
        ],
        total: 32.96,
        orderedAt: "2024-11-28 1:15 PM",
        estimatedDelivery: "2:00 PM - 2:30 PM",
        deliveryAddress: "456 Oak Avenue, New York, NY 10002",
        driverName: "Sarah Williams",
        driverPhone: "+1 (555) 234-5678",
        driverRating: 4.9,
      },
      "ORD-1698765432102": {
        id: "ORD-1698765432102",
        status: "delivered",
        customer: "Bob Johnson",
        items: [
          { name: "Veggie Pizza", quantity: 1, price: 11.99 },
          { name: "Bruschetta", quantity: 2, price: 5.99 },
        ],
        total: 28.96,
        orderedAt: "2024-11-25 6:45 PM",
        estimatedDelivery: "7:30 PM - 8:00 PM",
        deliveryAddress: "789 Pine Road, New York, NY 10003",
        driverName: "Alex Brown",
        driverPhone: "+1 (555) 345-6789",
        driverRating: 4.7,
        deliveredAt: "2024-11-25 7:52 PM",
      },
    }

    if (trackingId in mockOrders) {
      setOrder(mockOrders[trackingId])
    } else {
      setError("Order not found. Please check your Order ID.")
    }
  }

  const getStatusInfo = (status) => {
    const statuses = {
      pending: { label: "Order Pending", icon: Clock, color: "yellow" },
      preparing: { label: "Preparing", icon: UtensilsCrossed, color: "blue" },
      "out-for-delivery": { label: "Out for Delivery", icon: Truck, color: "orange" },
      delivered: { label: "Delivered", icon: CheckCircle, color: "green" },
    }
    return statuses[status] || statuses.pending
  }

  const statusInfo = order ? getStatusInfo(order.status) : null
  const StatusIcon = statusInfo?.icon

  const timeline = [
    { step: "Order Placed", icon: Package, completed: true },
    { step: "Confirmed", icon: CheckCircle, completed: true },
    { step: "Preparing", icon: UtensilsCrossed, completed: order?.status !== "pending" },
    {
      step: "Out for Delivery",
      icon: Truck,
      completed: order?.status === "out-for-delivery" || order?.status === "delivered",
    },
    { step: "Delivered", icon: CheckCircle, completed: order?.status === "delivered" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cart.length} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-gray-600 mb-8">Enter your Order ID to track your delivery in real-time</p>

        {/* Search Form */}
        <Card className="p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="flex gap-4">
            <Input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="Enter Order ID (e.g., ORD-1698765432100)"
              className="flex-1 py-3"
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Track
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3 bg-red-50 p-3 rounded">{error}</p>}
          <p className="text-xs text-gray-500 mt-3">Try: ORD-1698765432100, ORD-1698765432101, or ORD-1698765432102</p>
        </Card>

        {order && (
          <div className="space-y-8">
            {/* Status Overview */}
            <Card className={`p-8 border-2 border-${statusInfo.color}-200 bg-${statusInfo.color}-50`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-${statusInfo.color}-500 rounded-full flex items-center justify-center`}>
                  <StatusIcon size={32} className="text-white" />
                </div>
                <div>
                  <p className={`text-${statusInfo.color}-600 text-sm font-semibold`}>Current Status</p>
                  <p className="text-3xl font-bold">{statusInfo.label}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-bold">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Ordered</p>
                  <p className="font-bold">{order.orderedAt}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Est. Delivery</p>
                  <p className="font-bold text-orange-600">{order.estimatedDelivery}</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-xl font-bold mb-8">Order Timeline</h2>

                  <div className="space-y-4">
                    {timeline.map((item, index) => {
                      const TimelineIcon = item.icon
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                item.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
                              }`}
                            >
                              <TimelineIcon size={20} />
                            </div>
                            {index < timeline.length - 1 && (
                              <div className={`w-1 h-12 ${item.completed ? "bg-green-500" : "bg-gray-300"}`}></div>
                            )}
                          </div>
                          <div className="flex-1 py-2">
                            <p className={`font-semibold ${item.completed ? "text-gray-900" : "text-gray-500"}`}>
                              {item.step}
                            </p>
                            {item.completed && <p className="text-sm text-green-600">Completed</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                {/* Order Items */}
                <Card className="p-8 mt-6">
                  <h2 className="text-xl font-bold mb-6">Order Items</h2>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-2xl font-bold text-orange-500">${order.total.toFixed(2)}</span>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Delivery Address */}
                <Card className="p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-orange-500" />
                    Delivery Address
                  </h3>
                  <p className="text-gray-700">{order.deliveryAddress}</p>
                </Card>

                {/* Driver Info */}
                {order.status !== "pending" && order.status !== "preparing" && (
                  <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                    <h3 className="font-bold mb-4">Driver Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Driver Name</p>
                        <p className="font-semibold">{order.driverName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-semibold text-orange-600">⭐ {order.driverRating}</p>
                      </div>
                      <a href={`tel:${order.driverPhone}`} className="block">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white justify-start gap-2">
                          <Phone size={18} />
                          Call Driver
                        </Button>
                      </a>
                    </div>
                  </Card>
                )}

                {/* Delivered Info */}
                {order.status === "delivered" && (
                  <Card className="p-6 bg-green-50 border-2 border-green-200">
                    <h3 className="font-bold mb-2 text-green-900">Delivered!</h3>
                    <p className="text-sm text-green-800 mb-4">Your order was delivered on {order.deliveredAt}</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full bg-transparent">
                        Leave Review
                      </Button>
                      <Link href="/">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Order Again</Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {!order && !error && (
          <Card className="p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Enter an Order ID to track your delivery</p>
          </Card>
        )}
      </div>
    </main>
  )
}
