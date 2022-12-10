// import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");

export const connectDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocsFromDB = async (client, collection, eventId, sort) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(eventId)
    .sort(sort)
    .toArray();

  return documents;
};
