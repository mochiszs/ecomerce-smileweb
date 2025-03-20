import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition-all"
        >
          <Link href={`/products/${product.id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-lg">S/ {product.price.toFixed(2)}</span>
                <Button size="sm" variant="outline" className="text-xs">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Añadir
                </Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

