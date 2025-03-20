"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import type { ReactNode } from "react"

// Mock Stripe public key for demo purposes
const stripePromise = loadStripe("pk_test_mock_key")

export function Stripe({ children }: { children: ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}

