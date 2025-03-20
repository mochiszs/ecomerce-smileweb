import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">También te puede gustar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

