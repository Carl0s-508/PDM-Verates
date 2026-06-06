import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/databaseInit";
import { useEffect } from "react";

export default function Layout() {
  // Dispara a inicialização e cópia do banco logo na abertura do App
  useEffect(() => {
    initializeDatabase().catch((err) => {
      console.error("Erro ao inicializar banco de dados:", err);
    });
  }, []);

  return (
    // Passamos apenas o nome do arquivo. O Expo SQLite se encarrega de abrir
    // o arquivo "database.db" que a função acima já preparou e salvou no aparelho.
    <SQLiteProvider databaseName="database.db">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </SQLiteProvider>
  );
}