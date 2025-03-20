"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/use-cart"
import { motion, AnimatePresence } from "framer-motion"

export default function CartNotification() {
  const { cart } = useCart()
  const [showNotification, setShowNotification] = useState(false)
  const [prevCartLength, setPrevCartLength] = useState(0)

  // Detectar cuando se añade un producto al carrito
  useEffect(() => {
    const currentCartLength = cart.reduce((total, item) => total + item.quantity, 0)

    if (currentCartLength > prevCartLength) {
      setShowNotification(true)

      // Ocultar la notificación después de 3 segundos
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)

      return () => clearTimeout(timer)
    }

    setPrevCartLength(currentCartLength)
  }, [cart, prevCartLength])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      {/* Contador de productos en el carrito */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}

      {/* Notificación animada */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-20 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart size={18} />
              <span>¡Producto añadido al carrito!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

