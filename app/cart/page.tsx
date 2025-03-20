"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/use-cart"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

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

  const [couponCode, setCouponCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calcular descuento si se aplica el cupón
  const discount = discountApplied ? subtotal * 0.05 : 0
  const total = subtotal - discount

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SMILEWEB") {
      setDiscountApplied(true)
    } else {
      alert("Código de cupón inválido")
      setDiscountApplied(false)
    }
  }

  const handleCheckout = () => {
    // Validar formulario
    const requiredFields = ["fullName", "idNumber", "phone", "department", "province", "district", "address"]

    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    // Crear mensaje de WhatsApp
    const orderItems = cart
      .map((item) => {
        const sizeInfo = item.size ? ` - Talla: ${item.size}` : ""
        return `• ${item.name}${sizeInfo} x ${item.quantity} = S/ ${(item.price * item.quantity).toFixed(2)}`
      })
      .join("\n")

    let message = `
*NUEVO PEDIDO - SMILE*

*Productos:*
${orderItems}

*Subtotal:* S/ ${subtotal.toFixed(2)}`

    // Añadir información de descuento si se aplicó
    if (discountApplied) {
      message += `
*Descuento (5%):* -S/ ${discount.toFixed(2)}
*Total con descuento:* S/ ${total.toFixed(2)}`
    } else {
      message += `
*Total:* S/ ${subtotal.toFixed(2)}`
    }

    message += `
*Envío:* Por cotizar

*Datos de entrega:*
Nombre: ${formData.fullName}
DNI/CE: ${formData.idNumber}
Celular: ${formData.phone}
Departamento: ${formData.department}
Provincia: ${formData.province}
Distrito: ${formData.district}
Dirección: ${formData.address}
Referencia: ${formData.reference || "No especificada"}
`

    // Codificar mensaje para WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/51904063440?text=${encodedMessage}`

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, "_blank")

    // Limpiar carrito
    clearCart()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-12">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Seguir comprando
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-6">Carrito de compras</h1>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-6">Parece que aún no has añadido productos a tu carrito</p>
              <Link href="/products">
                <Button>Ver productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-1 lg:col-span-2">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          {item.size && <p className="text-sm">Talla: {item.size}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Cantidad: {item.quantity}</p>
                          <p className="font-medium">S/ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id, item.size)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator className="my-8" />

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Datos de envío</h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Nombres completos *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="idNumber">DNI / CE *</Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Celular *</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Departamento *</Label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Ej: Lima"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="province">Provincia *</Label>
                      <Input
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        placeholder="Ej: Lima"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="district">Distrito *</Label>
                      <Input
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Ej: Miraflores"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Dirección *</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="reference">Referencia</Label>
                    <Textarea
                      id="reference"
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      placeholder="Punto de referencia para ubicar la dirección (opcional)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-20 rounded-lg border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>

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
                      <p className="text-xs text-green-500 mt-1">¡Cupón SMILEWEB aplicado! 5% de descuento</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/ {subtotal.toFixed(2)}</span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between text-green-500">
                        <span>Descuento (5%)</span>
                        <span>-S/ {discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>S/ {total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>Por cotizar</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>S/ {total.toFixed(2)} + envío</span>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Finalizar compra
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Al finalizar la compra, serás redirigido a WhatsApp para coordinar el pago y envío
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

