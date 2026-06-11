-- ==========================================
-- LIMPAR BANCO (TESTE)
-- ==========================================

DELETE FROM uso_diario;
DELETE FROM assinaturas;
DELETE FROM analises;
DELETE FROM users;


-- ==========================================
-- TESTE 1: INSERIR USUÁRIO
-- ==========================================

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


-- VER USUÁRIO INSERIDO
SELECT * FROM users;



-- ==========================================
-- TESTE 2: INSERIR ANÁLISE
-- ==========================================

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
    'https://site-teste.com',
    'Texto extraído do site',
    95,
    'Confiável',
    'Notícia',
    '["fonte1.com","fonte2.com"]'
);


-- VER ANÁLISES

SELECT * FROM analises;



-- ==========================================
-- TESTE 3: BUSCAR HISTÓRICO DO USUÁRIO
-- ==========================================

SELECT *
FROM analises
WHERE user_id = 'user_001'
ORDER BY created_at DESC;



-- ==========================================
-- TESTE 4: ATUALIZAR PLANO
-- ==========================================

UPDATE users
SET plano = 'premium'
WHERE id = 'user_001';


SELECT * FROM users;



-- ==========================================
-- TESTE 5: CRIAR ASSINATURA
-- ==========================================

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



-- ==========================================
-- TESTE 6: USO DIÁRIO PRIMEIRO ACESSO
-- ==========================================

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



-- ==========================================
-- TESTE 7: INCREMENTAR USO DIÁRIO
-- Simula segunda análise no mesmo dia
-- ==========================================

INSERT INTO uso_diario (
    id,
    user_id,
    quantidade
)
VALUES (
    'uso_001',
    'user_001',
    1
)

ON CONFLICT(user_id, data)
DO UPDATE SET quantidade = quantidade + 1;



SELECT * FROM uso_diario;



-- ==========================================
-- TESTE 8: VERIFICAR SCORE INVALIDO
-- Deve dar erro (CHECK)
-- ==========================================

INSERT INTO analises (
    id,
    user_id,
    score,
    resultado,
    categoria
)
VALUES (
    'analise_erro',
    'user_001',
    150,
    'Teste',
    'Teste'
);



-- ==========================================
-- TESTE 9: TESTAR EMAIL DUPLICADO
-- Deve dar erro (UNIQUE)
-- ==========================================

INSERT INTO users (
    id,
    nome,
    email
)
VALUES (
    'user_002',
    'Outro usuário',
    'afonso@email.com'
);



-- ==========================================
-- TESTE 10: TESTAR CASCADE DELETE
-- Apaga usuário e deve apagar:
-- analises
-- assinaturas
-- uso_diario
-- ==========================================

DELETE FROM users
WHERE id = 'user_001';



-- CONFERIR SE SUMIU TUDO

SELECT * FROM users;

SELECT * FROM analises;

SELECT * FROM assinaturas;

SELECT * FROM uso_diario;