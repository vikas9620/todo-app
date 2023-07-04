import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://vikassingh9620:vikasSINGH96@cluster0.d4ppp3y.mongodb.net/todos"
    );
    const db = client.db();
    const meetupsCollection = db.collection("todos");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(200).json({ message: "task added successfully" });
  }
}

export default handler;