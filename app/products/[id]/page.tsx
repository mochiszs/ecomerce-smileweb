import { products } from "@/lib/products"
import { notFound } from "next/navigation"
import Image from "next/image"
import ProductDetails from "@/components/product-details"
import RelatedProducts from "@/components/related-products"


export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Find related products (same category)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="relative">
          <div className="sticky top-24">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square relative rounded overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ProductDetails product={product} />
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

