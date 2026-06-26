import { type SQLiteDatabase } from "expo-sqlite";

// ==========================================
// TIPAGENS
// ==========================================

export interface User {
  id: string;
  nome: string;
  email: string;
  plano: string;
  foto?: string;
  created_at: string;
}

export interface Analise {
  id: string;
  user_id: string;
  link?: string;
  texto_extraido?: string;
  score: number;
  resultado: string;
  categoria: string;
  fontes: string;
  created_at: string;
}

// ==========================================
// CONTROLE DE INIT (🔥 FIX PRINCIPAL)
// ==========================================

let isInitialized = false;

// ==========================================
// CRIAÇÃO DO BANCO (SEGURA)
// ==========================================

export async function initializeDatabase(db: SQLiteDatabase) {
  // 🔥 impede execução dupla (principal causa do teu erro)
  if (isInitialized) return;

  isInitialized = true;

  try {
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nome TEXT,
        email TEXT UNIQUE,
        plano TEXT DEFAULT 'gratis',
        foto TEXT,
        created_at TEXT DEFAULT (datetime('now','localtime')) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS analises (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        link TEXT,
        texto_extraido TEXT,
        score INTEGER CHECK(score >= 0 AND score <= 100),
        resultado TEXT,
        categoria TEXT,
        fontes TEXT DEFAULT '[]',
        created_at TEXT DEFAULT (datetime('now','localtime')) NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS assinaturas (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        plano TEXT NOT NULL,
        status TEXT NOT NULL,
        metodo_pagamento TEXT,
        expires_at TEXT,
        created_at TEXT DEFAULT (datetime('now','localtime')) NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS uso_diario (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        data TEXT DEFAULT (date('now','localtime')) NOT NULL,
        quantidade INTEGER DEFAULT 1 NOT NULL,
        UNIQUE(user_id, data),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Banco criado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco:", error);
  }
}

// ==========================================
// INSERT USER
// ==========================================

export async function dbInsertUser(
  db: SQLiteDatabase,
  id: string,
  nome: string,
  email: string,
  foto?: string
) {
  await db.runAsync(
    `
    INSERT OR IGNORE INTO users
    (id, nome, email, foto)
    VALUES
    ($id, $nome, $email, $foto)
    `,
    {
      $id: id,
      $nome: nome,
      $email: email,
      $foto: foto ?? null,
    }
  );
}

// ==========================================
// INSERT ANÁLISE
// ==========================================

export async function dbInsertAnalise(
  db: SQLiteDatabase,
  id: string,
  userId: string,
  link: string | null,
  textoExtraido: string | null,
  score: number,
  resultado: string,
  categoria: string,
  fontes: string = "[]"
) {
  await db.runAsync(
    `
    INSERT INTO analises
    (id, user_id, link, texto_extraido, score, resultado, categoria, fontes)
    VALUES
    ($id, $userId, $link, $texto, $score, $resultado, $categoria, $fontes)
    `,
    {
      $id: id,
      $userId: userId,
      $link: link,
      $texto: textoExtraido,
      $score: score,
      $resultado: resultado,
      $categoria: categoria,
      $fontes: fontes,
    }
  );
}

// ==========================================
// SELECT USER
// ==========================================

export async function dbSelectUser(db: SQLiteDatabase, userId: string) {
  return await db.getFirstAsync<User>(
    `
    SELECT * FROM users WHERE id=$id
    `,
    { $id: userId }
  );
}

// ==========================================
// SELECT ANÁLISES
// ==========================================

export async function dbSelectUserAnalises(db: SQLiteDatabase, userId: string) {
  return await db.getAllAsync<Analise>(
    `
    SELECT * FROM analises
    WHERE user_id=$id
    ORDER BY created_at DESC
    `,
    { $id: userId }
  );
}

// ==========================================
// UPDATE PLANO
// ==========================================

export async function dbUpdateUserPlano(
  db: SQLiteDatabase,
  userId: string,
  novoPlano: string
) {
  await db.runAsync(
    `
    UPDATE users
    SET plano=$plano
    WHERE id=$id
    `,
    {
      $id: userId,
      $plano: novoPlano,
    }
  );
}

// ==========================================
// DELETE ANÁLISE
// ==========================================

export async function dbDeleteAnalise(db: SQLiteDatabase, id: string) {
  await db.runAsync(
    `
    DELETE FROM analises
    WHERE id=$id
    `,
    { $id: id }
  );
}

// ==========================================
// DELETE USER
// ==========================================

export async function dbDeleteUser(db: SQLiteDatabase, id: string) {
  await db.runAsync(
    `
    DELETE FROM users
    WHERE id=$id
    `,
    { $id: id }
  );
}

// ==========================================
// USO DIÁRIO (FIX CONFLITO SAFE UPSERT)
// ==========================================

export async function dbIncrementarUsoDiario(
  db: SQLiteDatabase,
  userId: string
) {
  const hoje = new Date().toLocaleDateString("en-CA");

  await db.runAsync(
    `
    INSERT INTO uso_diario
    (id, user_id, data, quantidade)
    VALUES
    ($id, $userId, $data, 1)

    ON CONFLICT(user_id, data)
    DO UPDATE SET
    quantidade = quantidade + 1
    `,
    {
      $id: `${userId}_${hoje}`,
      $userId: userId,
      $data: hoje,
    }
  );
}