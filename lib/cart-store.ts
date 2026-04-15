"use client"

import { useSyncExternalStore, useCallback } from "react"
import type { Product } from "./products"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const STORAGE_KEY = "Aarogya-siri-cart"

function getInitialState(): CartState {
  if (typeof window === "undefined") {
    return { items: [] }
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore
  }
  return { items: [] }
}

let state: CartState = { items: [] }
let listeners: Set<() => void> = new Set()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function persist() {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export function addToCart(product: Product, quantity = 1) {
  const existingIndex = state.items.findIndex(
    (item) => item.product.id === product.id
  )
  if (existingIndex >= 0) {
    state = {
      items: state.items.map((item, i) =>
        i === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ),
    }
  } else {
    state = {
      items: [...state.items, { product, quantity }],
    }
  }
  persist()
  emitChange()
}

export function removeFromCart(productId: string) {
  state = {
    items: state.items.filter((item) => item.product.id !== productId),
  }
  persist()
  emitChange()
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }
  state = {
    items: state.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    ),
  }
  persist()
  emitChange()
}

export function clearCart() {
  state = { items: [] }
  persist()
  emitChange()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return state
}

const serverSnapshot: CartState = { items: [] }

function getServerSnapshot(): CartState {
  return serverSnapshot
}

// Initialize from localStorage on client
if (typeof window !== "undefined") {
  state = getInitialState()
}

export function useCart() {
  const cartState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const count = cartState.items.reduce((sum, item) => sum + item.quantity, 0)
  const total = cartState.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return {
    items: cartState.items,
    count,
    total,
    addToCart: useCallback(
      (product: Product, quantity = 1) => addToCart(product, quantity),
      []
    ),
    removeFromCart: useCallback(
      (productId: string) => removeFromCart(productId),
      []
    ),
    updateQuantity: useCallback(
      (productId: string, quantity: number) => updateQuantity(productId, quantity),
      []
    ),
    clearCart: useCallback(() => clearCart(), []),
  }
}
