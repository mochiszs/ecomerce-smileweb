"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/use-cart"
import { useState } from "react"

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")

  const handleAddToCart = () => {
    if (selectedSize || product.category.toLowerCase().includes("poster")) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.category.toLowerCase().includes("poster") ? "Único" : selectedSize,
        quantity: 1,
      })
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition-all">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        </Link>
        <p className="text-gray-400 text-sm">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-lg">S/ {product.price.toFixed(2)}</span>
        </div>

        {!product.category.toLowerCase().includes("poster") && (
          <div className="mt-3 mb-3">
            <p className="text-sm text-gray-400 mb-1">Talla:</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-2 py-1 text-xs border rounded ${
                    selectedSize === size ? "border-blue-500 bg-blue-900/30" : "border-gray-700 hover:border-gray-500"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          className="w-full mt-2 bg-blue-900 hover:bg-blue-800"
          onClick={handleAddToCart}
          disabled={!selectedSize && !product.category.toLowerCase().includes("poster")}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Añadir al Carrito
        </Button>
      </div>
    </div>
  )
}

