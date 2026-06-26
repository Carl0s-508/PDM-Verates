import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../../types/user";

// pega o último usuário criado
export async function getLastUser(db: SQLiteDatabase) {
  return db.getFirstAsync<User>(`
    SELECT * FROM users 
    ORDER BY created_at DESC 
    LIMIT 1
  `);
}

// atualiza usuário atual
export async function updateUser(
  db: SQLiteDatabase,
  nome: string,
  email: string
) {
  return db.runAsync(
    `
    UPDATE users
    SET nome = $nome,
        email = $email
    WHERE id = (
      SELECT id FROM users
      ORDER BY created_at DESC
      LIMIT 1
    )
    `,
    {
      $nome: nome,
      $email: email,
    }
  );
}