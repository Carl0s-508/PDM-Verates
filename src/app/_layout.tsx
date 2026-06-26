import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { initializeDatabase } from "../database/databaseInit";

function AppStack() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      {Platform.OS === "web" ? (
        <AppStack />
      ) : (
        <SQLiteProvider
          databaseName="database.db"
          onInit={initializeDatabase}
        >
          <AppStack />
        </SQLiteProvider>
      )}
    </SafeAreaProvider>
  );
}