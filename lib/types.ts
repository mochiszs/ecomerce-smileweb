export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  images: string[]
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

