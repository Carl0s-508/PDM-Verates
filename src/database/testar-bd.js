const sqlite3 = require("expo-sqlite");

async function teste() {
  const db = await sqlite3.openDatabaseAsync("database.db");

  console.log("Banco aberto!");

  const tabelas = await db.getAllAsync(`
    SELECT name 
    FROM sqlite_master 
    WHERE type='table';
  `);

  console.log("Tabelas:");
  console.log(tabelas);

  const users = await db.getAllAsync(`
    SELECT * FROM users;
  `);

  console.log("Usuários:");
  console.log(users);
}

teste();