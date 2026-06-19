import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeDatabase } from "../database/databaseInit";

function AppStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
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