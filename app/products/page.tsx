import { products } from "@/lib/products"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Suspense } from "react"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = searchParams.category as string | undefined
  const size = searchParams.size as string | undefined
  const sort = searchParams.sort as string | undefined

  // Filter products based on search params
  let filteredProducts = [...products]

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase().replace(/\s+/g, "-") === category,
    )
  }

  if (size) {
    filteredProducts = filteredProducts.filter((product) => product.sizes.includes(size.toUpperCase()))
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {category
          ? category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : "Todos los Productos"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <ProductFilters />
        </aside>

        <main className="lg:w-3/4">
          <Suspense fallback={<div>Cargando productos...</div>}>
            <ProductGrid products={filteredProducts} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

