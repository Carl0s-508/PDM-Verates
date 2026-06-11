import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/databaseInit";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <>
      {Platform.OS === "web" ? (
        <Stack />
      ) : (
        <SQLiteProvider
          databaseName="database.db"
          onInit={initializeDatabase}
        >
          <Stack />
        </SQLiteProvider>
      )}
    </>
  );
}