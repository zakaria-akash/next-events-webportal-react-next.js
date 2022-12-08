import React from "react";

import { MongoClient } from "mongodb";

const newsletterRegistrationApi = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.USERNAME_PASSWORD}@starting-cluster-01.5mukk.mongodb.net/next-events?retryWrites=true&w=majority`
    );

    const db = client.db();

    await db.collection("email").insertOne({
      email: userEmail,
    });

    client.close();
    res.status(201).json({ message: "Signed up successfully." });
  }
};

export default newsletterRegistrationApi;
