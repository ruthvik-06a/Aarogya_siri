"use client"

import { useState } from "react"
import { X, Minus, Plus, ShoppingBag, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Product } from "@/lib/products"
import { sendOrderEmail } from "@/lib/emailjs"
import { toast } from "sonner"

interface OrderModalProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderModal({ product, open, onOpenChange }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const total = product.price * quantity

  function resetForm() {
    setQuantity(1)
    setSuccess(false)
    setFormData({ name: "", email: "", phone: "", address: "" })
  }

  function handleClose() {
    onOpenChange(false)
    setTimeout(resetForm, 300)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      await sendOrderEmail({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        productName: product.name,
        productPrice: product.price,
        quantity,
        totalAmount: total,
      })
      setSuccess(true)
      toast.success("Order placed successfully!")
    } catch {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="size-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Order Placed!
            </h2>
            <p className="text-muted-foreground">
              Thank you for your order. We will contact you shortly to confirm delivery details.
            </p>
            <div className="mt-2 rounded-lg bg-secondary p-4 text-left">
              <p className="text-sm text-muted-foreground">Order Summary</p>
              <p className="font-medium text-foreground">{product.name} x {quantity}</p>
              <p className="text-lg font-bold text-primary">{`\u20B9${total}`}</p>
            </div>
            <Button onClick={handleClose} className="mt-4 rounded-full px-8">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Place Order</DialogTitle>
        </DialogHeader>

        {/* Product Summary */}
        <div className="flex gap-4 rounded-lg bg-secondary p-4">
          <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="font-medium text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.weight}</p>
            </div>
            <p className="text-lg font-bold text-primary">{`\u20B9${product.price}`}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <span className="text-sm font-medium text-foreground">Quantity</span>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 rounded-full"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-8 text-center font-medium text-foreground">
              {quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 rounded-full"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="order-name" className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <Input
              id="order-name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="order-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="order-email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="order-phone" className="text-sm font-medium text-foreground">
              Phone Number
            </label>
            <Input
              id="order-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="order-address" className="text-sm font-medium text-foreground">
              Delivery Address
            </label>
            <Textarea
              id="order-address"
              placeholder="Full address with pincode"
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          {/* Total */}
          <div className="flex items-center justify-between rounded-lg bg-primary/5 p-4">
            <span className="font-medium text-foreground">Total Amount</span>
            <span className="text-xl font-bold text-primary">{`\u20B9${total}`}</span>
          </div>

          <Button
            type="submit"
            size="lg"
            className="rounded-full"
            disabled={submitting}
          >
            {submitting ? (
              "Placing Order..."
            ) : (
              <>
                <ShoppingBag className="mr-2 size-4" />
                Place Order
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Payment on delivery. Delivery within Karnataka only.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
