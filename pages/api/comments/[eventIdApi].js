import React from "react";

const eventIdApi = (req, res) => {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res.status(201).json({
      message: "Comment submitted successfully..",
      comment: newComment,
    });
  }
  if (req.method === "GET") {
    const sampleComments = [
      {
        id: "c1",
        name: "Zakaria",
        text: "First sample comment for testing!",
      },
      {
        id: "c2",
        name: "Ibrahim",
        text: "Second sample comment for testing!",
      },
    ];

    res.status(200).json({
      comments: sampleComments,
    });
  }
};

export default eventIdApi;
