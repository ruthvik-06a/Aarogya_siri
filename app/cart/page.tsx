"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Truck, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-store"
import { toast } from "sonner"

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [checkoutMode, setCheckoutMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center lg:px-8">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="size-12 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Order Placed Successfully!
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Thank you for your order. We have received your details and will contact you shortly to confirm delivery.
          </p>
          <Link href="/shop" className="mt-8">
            <Button size="lg" className="rounded-full px-8">
              Continue Shopping
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center lg:px-8">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="size-12 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Your Cart is Empty
          </h1>
          <p className="mt-3 text-muted-foreground">
            Looks like you haven't added any products yet.
          </p>
          <Link href="/shop" className="mt-8">
            <Button size="lg" className="rounded-full px-8">
              Start Shopping
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const deliveryFee = total >= 499 ? 0 : 49
  const grandTotal = total + deliveryFee

  async function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          items: items.map((item) => ({
            productName: item.product.name,
            productPrice: item.product.price,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
          })),
          totalAmount: grandTotal,
        }),
      })

      const message = await res.text()
      if (!res.ok) {
        throw new Error(message)
      }

      clearCart()
      setOrderPlaced(true)
      toast.success("Order placed successfully!")
    } catch (err) {
      console.error("Order failed:", err)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-4xl font-bold">
            {checkoutMode ? "Checkout" : "Shopping Cart"}
          </h1>
          <p className="mt-2 text-lg opacity-90">
            {checkoutMode
              ? "Enter your details to complete the order"
              : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {checkoutMode ? (
          /* Checkout Form */
          <div className="mx-auto max-w-2xl">
            <button
              onClick={() => setCheckoutMode(false)}
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Cart
            </button>

            {/* Order Summary */}
            <div className="mb-8 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-card-foreground">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="text-card-foreground">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="my-2 h-px bg-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-card-foreground">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? "font-medium text-primary" : "text-card-foreground"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="my-2 h-px bg-border" />
                <div className="flex justify-between font-bold text-card-foreground">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            <form onSubmit={handleSubmitOrder} className="flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 font-serif text-lg font-bold text-card-foreground">
                  Your Details
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Delivery Address *
                    </label>
                    <Textarea
                      required
                      rows={3}
                      placeholder="Enter your full delivery address with pincode"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
                <Truck className="size-4 shrink-0" />
                <span>Cash on Delivery available across Karnataka</span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full text-base"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order — ₹${grandTotal}`
                )}
              </Button>
            </form>
          </div>
        ) : (
          /* Cart View */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4 sm:gap-6 sm:p-6"
                  >
                    {/* Image */}
                    <Link
                      href={`/shop/${item.product.id}`}
                      className="relative size-24 shrink-0 overflow-hidden rounded-lg sm:size-28"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/shop/${item.product.id}`}
                          className="font-serif text-lg font-semibold text-card-foreground hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.product.weight}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="size-3.5" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-6 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="size-3.5" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-card-foreground">
                            ₹{item.product.price * item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => {
                              removeFromCart(item.product.id)
                              toast.info(`${item.product.name} removed from cart`)
                            }}
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link href="/shop">
                  <Button variant="outline" className="rounded-full">
                    <ArrowLeft className="mr-1 size-4" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    clearCart()
                    toast.info("Cart cleared")
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl font-bold text-card-foreground">
                  Order Summary
                </h2>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-card-foreground">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? "font-medium text-primary" : "text-card-foreground"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Truck className="size-3" />
                      Free delivery on orders above ₹499
                    </p>
                  )}
                  <div className="my-2 h-px bg-border" />
                  <div className="flex justify-between text-base font-bold text-card-foreground">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="mt-6 w-full rounded-full text-base"
                  onClick={() => setCheckoutMode(true)}
                >
                  Proceed to Checkout
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Cash on Delivery available across Karnataka
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}