"use client"

import { useState } from "react"
import { BarChart3, Users, ShoppingBag, TrendingUp, Settings, LogOut, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AdminPage() {
  const [adminTab, setAdminTab] = useState("overview")
  const [isAddingMenu, setIsAddingMenu] = useState(false)
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Margherita Pizza", price: 12.99, category: "Pizza", active: true },
    { id: 2, name: "Garlic Bread", price: 4.99, category: "Appetizers", active: true },
    { id: 3, name: "Pepperoni Pizza", price: 13.99, category: "Pizza", active: true },
    { id: 4, name: "Caesar Salad", price: 8.99, category: "Salads", active: true },
    { id: 5, name: "Veggie Pizza", price: 11.99, category: "Pizza", active: true },
    { id: 6, name: "Bruschetta", price: 5.99, category: "Appetizers", active: true },
  ])
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Pizza", description: "" })
  const [orders, setOrders] = useState([
    { id: "ORD-1698765432100", customer: "John Doe", total: 45.97, status: "delivered", items: 3 },
    { id: "ORD-1698765432101", customer: "Jane Smith", total: 32.96, status: "preparing", items: 2 },
    { id: "ORD-1698765432102", customer: "Bob Johnson", total: 28.96, status: "pending", items: 2 },
  ])

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const activeMenuItems = menuItems.filter((item) => item.active).length

  const handleAddMenuItem = () => {
    if (newItem.name && newItem.price) {
      const newMenu = {
        id: Math.max(...menuItems.map((m) => m.id), 0) + 1,
        name: newItem.name,
        price: Number.parseFloat(newItem.price),
        category: newItem.category,
        active: true,
      }
      setMenuItems([...menuItems, newMenu])
      setNewItem({ name: "", price: "", category: "Pizza", description: "" })
      setIsAddingMenu(false)
    }
  }

  const handleToggleMenuItem = (id) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const handleUpdateOrderStatus = (id, newStatus) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl hidden md:inline">FoodHub Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline">Back to Store</Button>
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold mt-2">{totalOrders}</p>
              </div>
              <ShoppingBag size={32} className="text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
              </div>
              <TrendingUp size={32} className="text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Menu Items</p>
                <p className="text-3xl font-bold mt-2">{activeMenuItems}</p>
              </div>
              <BarChart3 size={32} className="text-orange-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
                <p className="text-3xl font-bold mt-2">{orders.filter((o) => o.status === "pending").length}</p>
              </div>
              <Users size={32} className="text-purple-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          {[
            { id: "overview", label: "Overview" },
            { id: "orders", label: "Orders" },
            { id: "menu", label: "Menu" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                adminTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {adminTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-500">${order.total.toFixed(2)}</p>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-1 ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "preparing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold mb-4 text-blue-900">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                    <Plus size={16} className="mr-2" />
                    New Order
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 size={16} className="mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {adminTab === "orders" && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold">Items</th>
                    <th className="text-left py-3 px-4 font-semibold">Total</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.items} items</td>
                      <td className="py-3 px-4 font-bold text-orange-500">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : order.status === "preparing"
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : "bg-yellow-100 text-yellow-800 border-yellow-300"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Menu Tab */}
        {adminTab === "menu" && (
          <div className="space-y-6">
            {!isAddingMenu ? (
              <Button onClick={() => setIsAddingMenu(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus size={20} className="mr-2" />
                Add Menu Item
              </Button>
            ) : (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold mb-4">Add New Menu Item</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <Input
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="e.g., Margherita Pizza"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Price</label>
                      <Input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option>Pizza</option>
                        <option>Appetizers</option>
                        <option>Salads</option>
                        <option>Desserts</option>
                        <option>Beverages</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleAddMenuItem} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Save Item
                    </Button>
                    <Button onClick={() => setIsAddingMenu(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Menu Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg flex items-center justify-between ${
                      !item.active ? "opacity-50 bg-gray-50" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.category} • ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleMenuItem(item.id)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMenuItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {adminTab === "settings" && (
          <Card className="p-6 max-w-2xl">
            <h2 className="text-xl font-bold mb-6">Admin Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                <Input placeholder="FoodHub" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Delivery Fee</label>
                <Input placeholder="3.99" type="number" step="0.01" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Operating Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Opens</label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Closes</label>
                    <Input type="time" defaultValue="23:00" />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="font-medium">Enable online ordering</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="font-medium">Enable delivery</span>
                </label>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Save Settings</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
