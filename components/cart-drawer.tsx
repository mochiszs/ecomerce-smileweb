"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ShoppingCart, Trash2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useCart } from "@/lib/use-cart"


interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isCheckout, setIsCheckout] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    department: "",
    province: "",
    district: "",
    address: "",
    reference: "",
  })

  // Close drawer when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && target.classList.contains("drawer-overlay")) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calcular descuento si se aplica el cupón
  const discount = discountApplied ? subtotal * 0.15 : 0
  const total = subtotal - discount

  const handleCheckout = () => {
    setIsCheckout(true)
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "ASD") {
      setDiscountApplied(true)
    } else {
      alert("Código de cupón inválido")
      setDiscountApplied(false)
    }
  }

  const handleWhatsAppCheckout = () => {
    // Validar campos obligatorios
    const requiredFields = ["fullName", "idNumber", "phone", "department", "province", "district", "address"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }


    // Format cart items for WhatsApp message
    const itemsText = cart
      .map((item) => `*${item.name}* (${item.size}) x${item.quantity} - S/ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    // Create the message
    let message = `*Resumen de Pedido SMILE*\n\n${itemsText}\n\n*Subtotal:* S/ ${subtotal.toFixed(2)}`

    // Añadir información de descuento si se aplicó
    if (discountApplied) {
      message += `\n*Descuento (15%):* -S/ ${discount.toFixed(2)}`
      message += `\n*Total con descuento:* S/ ${total.toFixed(2)}`
    }

    message += `\n*Envío:* (Por cotizar)\n\n*Datos del Cliente:*\nNombre: ${formData.fullName
      }\nDNI/CE: ${formData.idNumber}\nTeléfono: ${formData.phone}\nUbicación: ${formData.department
      }, ${formData.province}, ${formData.district}\nDirección: ${formData.address}\nReferencia: ${formData.reference}`

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp with the message
    window.open(`https://wa.me/51904063440?text=${encodedMessage}`, "_blank")

    // Clear cart and close drawer
    clearCart()
    setIsCheckout(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 drawer-overlay bg-black/50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-950 text-white shadow-xl transition-transform duration-300 transform translate-x-0 overflow-y-auto">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isCheckout ? "Finalizar Compra" : "Tu Carrito"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar carrito">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {isCheckout ? (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Información de Envío</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Nombres Completos *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium mb-1">
                  DNI / CE *
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Celular *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium mb-1">
                  Departamento *
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  placeholder="Ej: Lima"
                  required
                />
              </div>

              <div>
                <label htmlFor="province" className="block text-sm font-medium mb-1">
                  Provincia *
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  placeholder="Ej: Lima"
                  required
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium mb-1">
                  Distrito *
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  placeholder="Ej: Miraflores"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Dirección *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="reference" className="block text-sm font-medium mb-1">
                  Referencia
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                  placeholder="Punto de referencia (opcional)"
                />
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="font-semibold mb-2">Resumen del Pedido</h4>
                <div className="flex justify-between mb-1">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between mb-1 text-green-500">
                    <span>Descuento (15%)</span>
                    <span>-S/ {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between mb-1 font-medium">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Envío</span>
                  <span>(Por cotizar)</span>
                </div>

           

                <Button className="w-full bg-blue-900 hover:bg-blue-800" onClick={handleWhatsAppCheckout}>
                  Completar Pedido por WhatsApp
                </Button>

                <Button variant="outline" className="w-full mt-2" onClick={() => setIsCheckout(false)}>
                  Volver al Carrito
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="p-4 flex-1">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Tu carrito está vacío</p>
                  <Button variant="outline" className="mt-4" onClick={onClose}>
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 py-3 border-b border-gray-800">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">Talla: {item.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-700 rounded">
                            <button
                              className="px-2 py-1 text-gray-400 hover:text-white"
                              onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span className="px-2 py-1">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-gray-400 hover:text-white"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id, item.size)}
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-400">S/ {item.price.toFixed(2)} c/u</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                {/* Cupón de descuento */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Cupón de descuento</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ingresa tu código"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-gray-900 border-gray-700"
                    />
                    <Button variant="outline" size="sm" onClick={applyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                  {discountApplied && (
                    <p className="text-xs text-green-500 mt-1">¡Cupón SMILEPROMO15 aplicado! 15% de descuento</p>
                  )}
                </div>

                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">S/ {subtotal.toFixed(2)}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between mb-2 text-green-500">
                    <span>Descuento (15%)</span>
                    <span>-S/ {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between mb-2 font-medium">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>

                <p className="text-sm text-gray-400 mb-4">Envío y impuestos calculados al finalizar la compra</p>
                <Button className="w-full bg-blue-900 hover:bg-blue-800" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
                <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

