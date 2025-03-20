import FeaturedProducts from "@/components/featured-products"
import { products } from "@/lib/products"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8"></h1>
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <div className="aspect-video relative">
            <Image
        src="/WEB-SMILE-ANIVERSARIO.jpg"
        alt="Aniversario Smile"
        fill
        className="object-cover"
      />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">                
                
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Colección</h2>
          <FeaturedProducts products={products.slice(0, 8)} />
        </div>
      </section>
    </main>
  )
}

