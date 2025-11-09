"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, LogOut, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [cart, setCart] = useState([])
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    zipCode: "10001",
  })

  const [formData, setFormData] = useState(profile)

  useEffect(() => {
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    const savedProfile = localStorage.getItem("foodhub-profile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setFormData(JSON.parse(savedProfile))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setProfile(formData)
    localStorage.setItem("foodhub-profile", JSON.stringify(formData))
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("foodhub-profile")
    localStorage.removeItem("foodhub-cart")
    setProfile({
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street",
      city: "New York",
      zipCode: "10001",
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cart.length} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 size={20} className="text-orange-500" />
                </button>
              </div>

              {!isEditing ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold">{profile.fullName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail size={18} className="text-gray-400" />
                        <p className="text-sm text-gray-500">Email</p>
                      </div>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone size={18} className="text-gray-400" />
                        <p className="text-sm text-gray-500">Phone</p>
                      </div>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={18} className="text-gray-400" />
                      <p className="text-sm text-gray-500">Address</p>
                    </div>
                    <p className="font-medium">{profile.address}</p>
                    <p className="font-medium text-gray-700">
                      {profile.city}, {profile.zipCode}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input name="fullName" value={formData.fullName} onChange={handleInputChange} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input name="address" value={formData.address} onChange={handleInputChange} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <Input name="city" value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/orders">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    My Orders
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-orange-50 border-orange-200">
              <h3 className="font-bold mb-2 text-orange-900">Account Status</h3>
              <p className="text-sm text-orange-800 mb-4">Member since 2024</p>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
