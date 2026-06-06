import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

// ==========================================
// INTERFACES / TIPAGENS PARA O SEU APP
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
  fontes: string; // Salvo como string JSON
  created_at: string;
}

// ==========================================
// INICIALIZAÇÃO DO BANCO (SUA LÓGICA ATUAL)
// ==========================================
export async function initializeDatabase(): Promise<SQLiteDatabase> {
  const dbName = "database.db";
  const baseDir = (FileSystem as any).documentDirectory;
  
  if (!baseDir) {
    throw new Error("Não foi possível localizar o diretório de documentos do dispositivo.");
  }

  const dbFolder = `${baseDir}SQLite`;
  const dbPath = `${dbFolder}/${dbName}`;

  const folderInfo = await FileSystem.getInfoAsync(dbFolder);
  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(dbFolder, { intermediates: true });
  }

  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  
  if (!fileInfo.exists) {
    console.log("Configurando o banco de dados local pela primeira vez...");
    const asset = Asset.fromModule(require('./database.db'));
    await asset.downloadAsync();

    if (asset.localUri) {
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: dbPath,
      });
      console.log("Banco de dados copiado e pronto para uso!");
    } else {
      throw new Error("Falha ao carregar o arquivo local database.db");
    }
  }

  return await openDatabaseAsync(dbName);
}

// ============================================================================
// IMPLEMENTAÇÃO DAS SUBTAREFAS DO TRELLO (FUNÇÕES DE MANIPULAÇÃO DO BANCO)
// ============================================================================

/**
 * TAREFA: CRIAR INSERÇÕES
 * Salva um novo usuário no banco de dados após o cadastro/login.
 */
export async function dbInsertUser(db: SQLiteDatabase, id: string, nome: string, email: string, foto?: string): Promise<void> {
  const query = `
    INSERT INTO users (id, nome, email, foto) 
    VALUES ($id, $nome, $email, $foto);
  `;
  await db.runAsync(query, { $id: id, $nome: nome, $email: email, $foto: foto || null });
}

/**
 * TAREFA: CRIAR INSERÇÕES
 * Salva o resultado de uma análise de link/texto gerada pelo app.
 */
export async function dbInsertAnalise(
  db: SQLiteDatabase, 
  id: string, 
  userId: string, 
  link: string | null, 
  textoExtraido: string | null, 
  score: number, 
  resultado: string, 
  categoria: string,
  fontes: string = '[]'
): Promise<void> {
  const query = `
    INSERT INTO analises (id, user_id, link, texto_extraido, score, resultado, categoria, fontes)
    VALUES ($id, $userId, $link, $textoExtraido, $score, $resultado, $categoria, $fontes);
  `;
  await db.runAsync(query, {
    $id: id,
    $userId: userId,
    $link: link,
    $textoExtraido: textoExtraido,
    $score: score,
    $resultado: resultado,
    $categoria: categoria,
    $fontes: fontes
  });
}

/**
 * TAREFA: CRIAR CONSULTAS
 * Busca os dados cadastrais de um usuário específico pelo ID.
 */
export async function dbSelectUser(db: SQLiteDatabase, userId: string): Promise<User | null> {
  const query = `SELECT * FROM users WHERE id = $userId;`;
  const result = await db.getFirstAsync<User>(query, { $userId: userId });
  return result;
}

/**
 * TAREFA: CRIAR CONSULTAS
 * Busca todo o histórico de análises feitas por um usuário específico (utilizado na tela Verificadas).
 */
export async function dbSelectUserAnalises(db: SQLiteDatabase, userId: string): Promise<Analise[]> {
  const query = `SELECT * FROM analises WHERE user_id = $userId ORDER BY created_at DESC;`;
  const results = await db.getAllAsync<Analise>(query, { $userId: userId });
  return results;
}

/**
 * TAREFA: CRIAR ATUALIZAÇÕES
 * Atualiza o plano do usuário (Ex: de 'gratis' para 'premium' na tela de Planos/Pagamentos).
 */
export async function dbUpdateUserPlano(db: SQLiteDatabase, userId: string, novoPlano: string): Promise<void> {
  const query = `UPDATE users SET plano = $novoPlano WHERE id = $userId;`;
  await db.runAsync(query, { $novoPlano: novoPlano, $userId: userId });
}

/**
 * TAREFA: CRIAR REMOÇÕES
 * Remove uma análise específica do histórico do usuário.
 */
export async function dbDeleteAnalise(db: SQLiteDatabase, analiseId: string): Promise<void> {
  const query = `DELETE FROM analises WHERE id = $analiseId;`;
  await db.runAsync(query, { $analiseId: analiseId });
}

/**
 * TAREFA: CRIAR REMOÇÕES
 * Remove a conta do usuário por completo.
 * Nota: Devido à nossa regra FOREIGN KEY ON DELETE CASCADE configurada na estrutura do banco,
 * deletar o usuário deletará automaticamente todas as suas análises, assinaturas e uso diário!
 */
export async function dbDeleteUser(db: SQLiteDatabase, userId: string): Promise<void> {
  const query = `DELETE FROM users WHERE id = $userId;`;
  await db.runAsync(query, { $userId: userId });
}

/**
 * BÔNUS: CONTROLE DE USO DIÁRIO
 * Registra ou incrementa o uso diário de análises para controle de limites do plano gratuito.
 */
export async function dbIncrementarUsoDiario(db: SQLiteDatabase, userId: string): Promise<void> {
  const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const idUso = `${userId}_${hoje}`;

  const query = `
    INSERT INTO uso_diario (id, user_id, data, quantidade)
    VALUES ($id, $userId, $hoje, 1)
    ON CONFLICT(user_id, data) DO UPDATE SET quantidade = quantidade + 1;
  `;
  await db.runAsync(query, { $id: idUso, $userId: userId, $hoje: hoje });
}