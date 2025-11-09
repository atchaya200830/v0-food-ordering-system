import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Header({ cartCount = 0 }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl hidden md:inline">FoodHub</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            Home
          </Link>
          <Link href="/track" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            Track Order
          </Link>
          <Link href="/orders" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            Orders
          </Link>
          <Link
            href="/admin"
            className="text-gray-700 hover:text-orange-500 transition-colors font-medium hidden md:inline"
          >
            Admin
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            Profile
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            Login
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
