"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => {
      resetTimeout()
    }
  }, [currentIndex, products.length])

  const goToPrevious = () => {
    resetTimeout()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    resetTimeout()
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
  }

  // Asegurarse de que el carrusel se actualice correctamente cuando cambia el índice
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
    }
  }, [currentIndex])

  if (products.length === 0) return null

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ width: `${products.length * 100}%` }}
      >
        {products.map((product, index) => (
          <div key={product.id} className="relative" style={{ width: `${100 / products.length}%` }}>
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority={index === currentIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold">{product.name}</h3>
                  <p className="text-sm md:text-base opacity-90">{product.category}</p>
                  <p className="text-lg md:text-xl font-semibold mt-2">S/ {product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
        onClick={goToPrevious}
        aria-label="Producto anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
        onClick={goToNext}
        aria-label="Siguiente producto"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => {
              resetTimeout()
              setCurrentIndex(index)
            }}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

