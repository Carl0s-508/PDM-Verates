import { insertUser } from "../database/db";

export async function createUser(
  db: any,
  username: string,
  email: string
) {
  const user = {
    id: "usr_" + Date.now(),
    username,
    email,
  };

  await insertUser(db, user);

  return user;
}