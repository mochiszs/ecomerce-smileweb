"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import CartDrawer from "./cart-drawer"
import CartNotification from "./cart-notification"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Todos los Productos", path: "/products" },
    { name: "Polos Streetwear", path: "/products?category=polo-streetwear" },
    { name: "Polos Basic", path: "/products?category=polo-basic" },
    { name: "Baby Tees", path: "/products?category=baby-tees" },
    { name: "Pósters", path: "/products?category=posters" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-500">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
        <Link href="/">
        <img
        src="/LOGO SMILE PARA WEB.png"
        alt="Aniversario Smile"
        className="w-28 h-29 object-contain"
      />
</Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`hover:text-blue-400 transition-colors ${pathname === link.path ? "text-blue-400" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              aria-label="Carrito de compras"
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              <CartNotification />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 hover:text-blue-400 transition-colors ${
                  pathname === link.path ? "text-blue-400" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

