import emailjs from "@emailjs/browser"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

export const TEMPLATE_IDS = {
  order: process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID || "",
  contact: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "",
  seller: process.env.NEXT_PUBLIC_EMAILJS_SELLER_TEMPLATE_ID || "",
}

interface CartItem {
  productName: string
  productPrice: number
  quantity: number
  subtotal: number
}

interface OrderEmailData {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: CartItem[]
  totalAmount: number
}

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  message: string
}

interface SellerEmailData {
  name: string
  email: string
  phone: string
  farmLocation: string
  products: string
  farmSize: string
  message: string
}

function checkEmailJsConfig(templateId: string, type: string) {
  if (!SERVICE_ID) {
    throw new Error(`Missing NEXT_PUBLIC_EMAILJS_SERVICE_ID for ${type} email`)
  }

  if (!PUBLIC_KEY) {
    throw new Error(`Missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY for ${type} email`)
  }

  if (!templateId) {
    throw new Error(`Missing template ID for ${type} email`)
  }
}

export async function sendOrderEmail(data: OrderEmailData) {
  checkEmailJsConfig(TEMPLATE_IDS.order, "order")

  const itemsList = data.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.productName} × ${item.quantity} = ₹${item.subtotal}`
    )
    .join("\n")

  const templateParams = {
    to_email: "aruthvik4@gmail.com",
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    customer_address: data.customerAddress,
    order_items: itemsList,
    total_amount: `₹${data.totalAmount}`,
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_IDS.order,
      templateParams,
      {
        publicKey: PUBLIC_KEY,
      }
    )

    return {
      success: response.status === 200,
      response,
    }
  } catch (error) {
    console.error("Order email failed:", error)
    throw new Error("Failed to send order email")
  }
}

export async function sendContactEmail(data: ContactEmailData) {
  checkEmailJsConfig(TEMPLATE_IDS.contact, "contact")

  const templateParams = {
    to_email: "aruthvik4@gmail.com",
    from_name: data.name,
    from_email: data.email,
    from_phone: data.phone || "Not provided",
    message: data.message,
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_IDS.contact,
      templateParams,
      {
        publicKey: PUBLIC_KEY,
      }
    )

    return {
      success: response.status === 200,
      response,
    }
  } catch (error) {
    console.error("Contact email failed:", error)
    throw new Error("Failed to send contact email")
  }
}

export async function sendSellerEmail(data: SellerEmailData) {
  checkEmailJsConfig(TEMPLATE_IDS.seller, "seller")

  const templateParams = {
    to_email: "aruthvik4@gmail.com",
    seller_name: data.name,
    seller_email: data.email,
    seller_phone: data.phone,
    farm_location: data.farmLocation,
    products: data.products,
    farm_size: data.farmSize,
    message: data.message,
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_IDS.seller,
      templateParams,
      {
        publicKey: PUBLIC_KEY,
      }
    )

    return {
      success: response.status === 200,
      response,
    }
  } catch (error) {
    console.error("Seller email failed:", error)
    throw new Error("Failed to send seller email")
  }
}