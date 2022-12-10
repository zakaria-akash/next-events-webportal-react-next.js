// import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://zakaria_akash:25274_akash@starting-cluster-01.5mukk.mongodb.net/next-events?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocsFromDB = async (client, collection, eventId, sort) => {
  const db = client.db();
  const documents = await db.collection(collection).find(eventId).sort(sort).toArray();

  return documents;
};
