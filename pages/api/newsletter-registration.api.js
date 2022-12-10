import {
  connectDatabase,
  insertDocument,
} from "../../backend-helpers/db-utils";

const newsletterRegistrationApi = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }

    try {
      await insertDocument(client, "email", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }

    res.status(201).json({ message: "Signed up successfully." });
  }
};

export default newsletterRegistrationApi;
