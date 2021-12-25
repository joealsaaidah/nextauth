import { MongoClient } from "mongodb";

const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  return client;
};

export default connectToDatabase;
