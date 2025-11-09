"use client"

import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 pb-4 border-b last:border-b-0">
      <img
        src={item.image || "/placeholder.svg?height=80&width=80&query=food"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <p className="text-orange-500 font-bold mt-2">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-1 h-fit">
        <button
          onClick={() => onUpdateQuantity((item.quantity || 1) - 1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity || 1}</span>
        <button
          onClick={() => onUpdateQuantity((item.quantity || 1) + 1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <Plus size={16} />
        </button>
      </div>
      <button onClick={() => onRemove()} className="text-red-500 hover:text-red-700 px-2">
        <Trash2 size={20} />
      </button>
    </div>
  )
}
