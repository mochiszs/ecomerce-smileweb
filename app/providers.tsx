"use client"

import { CartProvider } from "@/lib/use-cart"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

