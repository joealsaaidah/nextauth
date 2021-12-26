import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";
const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req });
  // authenticate
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  // get data
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // check if the user exist
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }
  // validate the password
  const currentPassword = user.password;
  const arePasswordsEqual = await verifyPassword(oldPassword, currentPassword);
  if (!arePasswordsEqual) {
    //403 authenticated but not authorized
    //422 invalid input
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }
  // hash the new password
  const hashedPassword = await hashPassword(newPassword);
  // update the password

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password updated!" });
};

export default handler;
