import {
  connectDatabase,
  insertDocument,
  getAllDocsFromDB,
} from "../../../backend-helpers/db-utils";

const eventIdApi = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({
        message: "Invalid input!",
      });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(201).json({
        message: "Comment submitted successfully..",
        comment: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocsFromDB(
        client,
        "comments",
        { eventId: eventId },
        { _id: -1 }
      );
      res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  client.close();
};

export default eventIdApi;
