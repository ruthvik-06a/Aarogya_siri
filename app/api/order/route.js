import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGO_URI;

export async function POST(req) {
  let client;

  try {
    if (!uri) {
      throw new Error("MONGO_URI is missing");
    }

    const body = await req.json();

    const { name, email, phone, address, items, totalAmount } = body;

    if (!name || !phone || !address || !items || !totalAmount) {
      return new Response("Missing required fields", { status: 400 });
    }

    client = new MongoClient(uri);
    await client.connect();

    const db = client.db("avani");
    const orders = db.collection("orders");

    // Save order in DB
    await orders.insertOne({
      name,
      email,
      phone,
      address,
      items,
      totalAmount,
      createdAt: new Date(),
    });

    // ================== ✅ WHATSAPP MESSAGE (FOR FRONTEND) ==================

    const whatsappMessage = `🛒 New Order Received

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone}
Address: ${address}

Items:
${items
  .map(
    (item) =>
      `- ${item.productName} x ${item.quantity} = ₹${item.subtotal}`
  )
  .join("\n")}

Total Amount: ₹${totalAmount}`;

    // ================== ✅ EMAIL (UNCHANGED) ==================

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsText = items
      .map(
        (item) =>
          `- ${item.productName} x ${item.quantity} = ₹${item.subtotal}`
      )
      .join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order Received",
      text: `
New Order Received

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone}
Address: ${address}

Items:
${itemsText}

Total Amount: ₹${totalAmount}
      `,
    });

    // ✅ send message back to frontend
    return new Response(
      JSON.stringify({
        success: true,
        whatsappMessage,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("ORDER API ERROR:", err);
    return new Response(`❌ Error placing order: ${err.message}`, {
      status: 500,
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}