"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/lib/use-cart"

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (selectedSize || product.category.toLowerCase().includes("poster")) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.category.toLowerCase().includes("poster") ? "Único" : selectedSize,
        quantity,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-400 mt-1">{product.category}</p>
      </div>

      <div className="text-2xl font-bold">S/ {product.price.toFixed(2)}</div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Descripción</h3>
          <p className="text-gray-300">{product.description}</p>
        </div>

        {!product.category.toLowerCase().includes("poster") && (
          <div>
            <h3 className="text-sm font-medium mb-2">Talla</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
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

        <div>
          <h3 className="text-sm font-medium mb-2">Cantidad</h3>
          <div className="flex items-center border border-gray-700 rounded-md w-32">
            <button
              className="px-3 py-2 text-gray-400 hover:text-white"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="px-3 py-2 flex-1 text-center">{quantity}</span>
            <button
              className="px-3 py-2 text-gray-400 hover:text-white"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          className="flex-1 bg-blue-900 hover:bg-blue-800"
          size="lg"
          onClick={handleAddToCart}
          disabled={!selectedSize && !product.category.toLowerCase().includes("poster")}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Añadir al Carrito
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="pt-6 border-t border-gray-800">
  <h3 className="text-sm font-medium mb-2">Detalles del Producto</h3>
  <ul className="list-disc list-inside space-y-1 text-gray-300">
    {product.category.toLowerCase().includes("streetwear") && (
      <>
        <li>Material: Algodón Jersey 30/1</li>
        <li>Ajuste: Oversized fit</li>
        <ul>
  <li>
    <h5>✦ <em>Small</em> ✦</h5>
    <p>Ancho: 53 cm</p>
    <p>Largo: 72 cm</p>
  </li>
  <li>
    <h5>✦ <em>Medium</em> ✦</h5>
    <p>Ancho: 56 cm</p>
    <p>Largo: 74 cm</p>
  </li>
  <li>
    <h5>✦ <em>Large</em> ✦</h5>
    <p>Ancho: 59 cm</p>
    <p>Largo: 78 cm</p>
  </li>
</ul>
      </>
    )}
    {product.category.toLowerCase().includes("baby tee") && (
      <>
        <li>Material: Algodón Pima</li>
        <li>Ajuste: Slim fit</li>
        <ul>
  <li>
    <h5>✦ <em>Small</em> ✦</h5>
    <p>Ancho: 42 cm</p>
    <p>Alto: 48 cm</p>
    <p>Espalda: 33 cm</p>
  </li>
  <li>
    <h5>✦ <em>Medium</em> ✦</h5>
    <p>Ancho: 44 cm</p>
    <p>Alto: 50 cm</p>
    <p>Espalda: 35 cm</p>
  </li>
  <li>
    <h5>✦ <em>Large</em> ✦</h5>
    <p>Ancho: 46 cm</p>
    <p>Alto: 52 cm</p>
    <p>Espalda: 37 cm</p>
  </li>
</ul>
      </>
    )}
    {product.category.toLowerCase().includes("basic") && (
      <>
        <li>Material: Algodón Pima</li>
        <li>Cuidado: Lavar a máquina en frío</li>
        ‎ 
        <ul>
    <li>
       <h5>✦ <em>Small</em> ✦</h5>
       <p>Ancho: 50 cm</p>
       <p>Largo: 68 cm</p>
    </li>
    <li>
       <h5>✦ <em>Medium</em> ✦</h5>
      <p>Ancho: 52 cm</p>
      <p>Largo: 70 cm</p>
    </li>
    <li>
       <h5>✦ <em>Large</em> ✦</h5>
       <p>Ancho: 55 cm</p>
       <p>Largo: 72 cm</p>
    </li>
  </ul>
       
      </>
    )}
    {product.category.toLowerCase().includes("poster") && (
      <>
        <li>Impresión de alta calidad</li>
        <li>Ancho: 29,7 cm</li>
        <li>Largo: 42 cm</li>
      </>
    )}
  </ul>
</div>
    </div>
  )
}

