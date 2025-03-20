import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No se encontraron productos</h3>
          <p className="text-gray-400 mt-2">Intenta cambiar los filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

