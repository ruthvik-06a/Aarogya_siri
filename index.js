const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://aruthvik4_db_user:YOUR_PASSWORD@cluster0.gxefpaw.mongodb.net/avani";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("avani");
    const collection = db.collection("products");

    const products = await collection.find().toArray();

    console.log("📦 Products:", products);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();