CREATE TABLE users
(
    id TEXT PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    plano TEXT DEFAULT 'gratis',
    foto TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL
);

CREATE TABLE analises
(
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    link TEXT,
    texto_extraido TEXT,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    resultado TEXT,
    categoria TEXT,
    fontes TEXT DEFAULT '[]',
    created_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE assinaturas
(
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    plano TEXT NOT NULL,
    status TEXT NOT NULL,
    metodo_pagamento TEXT,
    expires_at TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE uso_diario
(
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    data TEXT DEFAULT (date('now', 'localtime')) NOT NULL,
    quantidade INTEGER DEFAULT 1 NOT NULL,
    UNIQUE (user_id, data),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);