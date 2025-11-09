"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("customer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate authentication
      if (!email || !password) {
        throw new Error("Please enter email and password")
      }

      if (userType === "admin") {
        // Admin credentials
        if (email === "admin@foodhub.com" && password === "admin123") {
          localStorage.setItem("foodhub-user", JSON.stringify({ type: "admin", email }))
          localStorage.setItem("foodhub-auth-token", "admin-token-" + Date.now())
          router.push("/admin")
        } else {
          throw new Error("Invalid admin credentials")
        }
      } else {
        // Customer login
        const userData = {
          type: "customer",
          email,
          fullName: email.split("@")[0],
          createdAt: new Date().toISOString(),
        }
        localStorage.setItem("foodhub-user", JSON.stringify(userData))
        localStorage.setItem("foodhub-auth-token", "customer-token-" + Date.now())
        router.push("/")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Welcome to FoodHub</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to your account</p>

        {/* User Type Selector */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setUserType("customer")}
            className={`py-3 rounded-lg font-medium transition-colors ${
              userType === "customer" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setUserType("admin")}
            className={`py-3 rounded-lg font-medium transition-colors ${
              userType === "admin" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={userType === "admin" ? "admin@foodhub.com" : "your@email.com"}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={userType === "admin" ? "admin123" : "••••••••"}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-semibold ${
              userType === "admin" ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        {userType === "customer" && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Don't have an account?</p>
            <Link href="/signup">
              <Button variant="outline" className="w-full bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>
        )}

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          {userType === "admin" ? (
            <>
              <p className="text-xs text-blue-800">Email: admin@foodhub.com</p>
              <p className="text-xs text-blue-800">Password: admin123</p>
            </>
          ) : (
            <p className="text-xs text-blue-800">Any email and password to continue</p>
          )}
        </div>

        {/* Home Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}
