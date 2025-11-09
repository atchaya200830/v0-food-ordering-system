"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function MenuCard({ item, onAddToCart }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
          <Button onClick={() => onAddToCart(item)} className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
