import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
/* import connectToDatabase from "../../../lib/db"; */
/* import { MongoDBAdapter } from "@next-auth/mongodb-adapter"; */
import connectToDatabase from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  /* adapter: MongoDBAdapter(await connectToDatabase()), */
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("could not log you in");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
