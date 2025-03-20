"use client"

import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal } from "lucide-react"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Estado inicial basado en los parámetros de la URL
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    size: searchParams.get("size") || "",
    sort: searchParams.get("sort") || "",
  })

  // Sincroniza el estado cuando cambian los parámetros de la URL
  useEffect(() => {
    setFilters({
      category: searchParams.get("category") || "",
      size: searchParams.get("size") || "",
      sort: searchParams.get("sort") || "",
    })
  }, [searchParams.toString()]); // 🔥 Corrección: Ahora solo depende de `searchParams`

  // Manejo del cambio en los filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // Aplicar los filtros en la URL
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()
    if (filters.category) params.set("category", filters.category)
    if (filters.size) params.set("size", filters.size)
    if (filters.sort) params.set("sort", filters.sort)

    router.push(`/products?${params.toString()}`)
    setIsOpen(false)
  }, [filters, router])

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({ category: "", size: "", sort: "" })
    router.push("/products")
    setIsOpen(false)
  }, [router])

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </h2>
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {isOpen ? "Ocultar" : "Mostrar"}
        </Button>
      </div>

      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        <div>
          <h3 className="text-sm font-medium mb-2">Categoría</h3>
          <div className="space-y-1">
            {["", "polo-streetwear", "polo-basic", "baby-tees", "posters"].map((cat) => (
              <label key={cat} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                {cat === "" ? "Todos los Productos" : cat.replace("-", " ")}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Talla</h3>
          <div className="space-y-1">
            {["", "s", "m", "l"].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={filters.size === size}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                {size === "" ? "Todas las Tallas" : size.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Ordenar Por</h3>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
          >
            <option value="">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A a Z</option>
            <option value="name-desc">Nombre: Z a A</option>
          </select>
        </div>

        <div className="pt-4 flex gap-2">
          <Button className="flex-1 bg-blue-900 hover:bg-blue-800" onClick={applyFilters}>
            Aplicar Filtros
          </Button>
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  )
}
