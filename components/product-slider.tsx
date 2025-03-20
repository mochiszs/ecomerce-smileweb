"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/products"

interface ProductSliderProps {
  products: Product[]
}

export function ProductSlider({ products }: ProductSliderProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => {
    setCurrent((current - 1 + products.length) % products.length)
  }

  const next = () => {
    setCurrent((current + 1) % products.length)
  }

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [current])

  if (products.length === 0) return null

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-background/80 backdrop-blur-sm">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Anterior</span>
        </Button>
        <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-background/80 backdrop-blur-sm">
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Siguiente</span>
        </Button>
      </div>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-full flex-none">
            <div className="relative h-[50vh] w-full overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Card className="absolute bottom-6 left-6 right-6 max-w-md mx-auto bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-muted-foreground">{product.description}</p>
                    <div className="pt-2">
                      <Link href={`/products/${product.id}`}>
                        <Button>Ver producto</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {products.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`h-2 w-2 rounded-full p-0 ${index === current ? "bg-primary" : "bg-muted"}`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Ir a slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

