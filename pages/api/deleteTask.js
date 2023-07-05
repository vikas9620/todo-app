import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    const client = await MongoClient.connect(
      "mongodb+srv://vikassingh9620:vikasSINGH96@cluster0.d4ppp3y.mongodb.net/todos"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");

    try {
      const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
      res.status(500).json({ message: "Failed to delete task" });
    }

    client.close();
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
