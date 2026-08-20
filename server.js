const express = require("express");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://aruthvik4_db_user:ruthvik88a@cluster0.gxefpaw.mongodb.net/avani";
const client = new MongoClient(uri);

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aruthvik4@gmail.com",
    pass: "tcxxcfyvzcodnvkz"
  }
});

// Order API
app.post("/order", async (req, res) => {
  try {
    await client.connect();

    const db = client.db("avani");
    const orders = db.collection("orders");

    const orderData = req.body;

    await orders.insertOne(orderData);

    await transporter.sendMail({
      from: "aruthvik4@gmail.com",
      to: "aruthvik4@gmail.com",
      subject: " New Order Received",
      text: `
New Order:

Name: ${orderData.name}
Phone: ${orderData.phone}
Address: ${orderData.address}
Product: ${orderData.product}
Price: ${orderData.price}
      `
    });

    res.send("Order placed & email sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error placing order");
  }
});

app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});