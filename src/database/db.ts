import { Platform } from "react-native";
import { insertUserWeb } from "./webStorage";
import { dbInsertUser } from "./databaseInit";
import type { SQLiteDatabase } from "expo-sqlite";

export async function insertUser(
  db: SQLiteDatabase | null,
  user: {
    id: string;
    username: string;
    email: string;
  }
) {
  if (Platform.OS === "web") {
    return insertUserWeb(user);
  }

  if (!db) throw new Error("DB não disponível");

  return dbInsertUser(db, user.id, user.username, user.email);
}