import React from "react";

import { MongoClient } from "mongodb";

const eventIdApi = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USERNAME_PASSWORD}@starting-cluster-01.5mukk.mongodb.net/next-events?retryWrites=true&w=majority`
  );
  const db = client.db();

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
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };


    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;

    res.status(201).json({
      message: "Comment submitted successfully..",
      comment: newComment,
    });
  }
  if (req.method === "GET") {

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({
      comments: documents,
    });
  }
  client.close();
};

export default eventIdApi;
