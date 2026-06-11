PRAGMA foreign_keys = ON;


-- LIMPAR BANCO
DELETE FROM uso_diario;
DELETE FROM assinaturas;
DELETE FROM analises;
DELETE FROM users;


-- TESTE USUÁRIO

INSERT INTO users (
    id,
    nome,
    email,
    foto
)
VALUES (
    'user_001',
    'Afonso Filho',
    'afonso@email.com',
    'foto.png'
);


SELECT * FROM users;



-- TESTE ANÁLISE

INSERT INTO analises (
    id,
    user_id,
    link,
    texto_extraido,
    score,
    resultado,
    categoria,
    fontes
)
VALUES (
    'analise_001',
    'user_001',
    'https://teste.com',
    'Texto extraído teste',
    95,
    'Confiável',
    'Notícia',
    '["fonte1.com"]'
);


SELECT * FROM analises;



-- TESTE PLANO

UPDATE users
SET plano = 'premium'
WHERE id = 'user_001';


SELECT * FROM users;



-- TESTE ASSINATURA

INSERT INTO assinaturas (
    id,
    user_id,
    plano,
    status,
    metodo_pagamento,
    expires_at
)
VALUES (
    'assinatura_001',
    'user_001',
    'premium',
    'ativa',
    'pix',
    '2027-01-01'
);


SELECT * FROM assinaturas;



-- TESTE USO DIÁRIO

INSERT INTO uso_diario (
    id,
    user_id,
    quantidade
)
VALUES (
    'uso_001',
    'user_001',
    1
);


SELECT * FROM uso_diario;



-- TESTE CASCADE DELETE

DELETE FROM users
WHERE id = 'user_001';


SELECT * FROM users;
SELECT * FROM analises;
SELECT * FROM assinaturas;
SELECT * FROM uso_diario;