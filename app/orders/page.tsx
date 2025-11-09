"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Link from "next/link"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    const savedOrders = localStorage.getItem("foodhub-orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      // Mock data for demo
      setOrders([
        {
          id: "ORD-1698765432100",
          date: "Nov 30, 2024",
          total: 45.97,
          status: "delivered",
          items: [
            { name: "Margherita Pizza", quantity: 2, price: 12.99 },
            { name: "Garlic Bread", quantity: 1, price: 4.99 },
          ],
        },
        {
          id: "ORD-1698765432101",
          date: "Nov 28, 2024",
          total: 32.96,
          status: "delivered",
          items: [
            { name: "Pepperoni Pizza", quantity: 1, price: 13.99 },
            { name: "Caesar Salad", quantity: 2, price: 8.99 },
          ],
        },
        {
          id: "ORD-1698765432102",
          date: "Nov 25, 2024",
          total: 28.96,
          status: "cancelled",
          items: [
            { name: "Veggie Pizza", quantity: 1, price: 11.99 },
            { name: "Bruschetta", quantity: 2, price: 5.99 },
          ],
        },
      ])
    }
  }, [])

  const getStatusBadge = (status) => {
    const styles = {
      delivered: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      preparing: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return styles[status] || styles.pending
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={20} />
      case "preparing":
        return <Package size={20} />
      case "pending":
        return <Clock size={20} />
      default:
        return <Clock size={20} />
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cart.length} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Order More</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start by ordering your favorite food!</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Menu</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-bold text-lg">{order.id}</p>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusBadge(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>

                  {/* Order Date and Total */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Items</p>
                      <p className="font-medium">{order.items.length} items</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-bold text-orange-500">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Order Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} <span className="text-gray-500">x{item.quantity}</span>
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {order.status === "delivered" && (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => {
                            order.items.forEach((item) => {
                              // Reorder logic
                            })
                          }}
                        >
                          Reorder
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Leave Review
                        </Button>
                      </>
                    )}
                    {order.status === "pending" && (
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Cancel Order
                      </Button>
                    )}
                    {order.status === "cancelled" && (
                      <Button className="flex-1 bg-gray-400 hover:bg-gray-500 text-white">Order Cancelled</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
