const API_URL = "http://172.16.6.176:3000";

export async function analisarConteudoIA(conteudo: string) {
  const response = await fetch(`${API_URL}/analisar-noticia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      noticia: conteudo,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao chamar backend");
  }

  return response.json();
}