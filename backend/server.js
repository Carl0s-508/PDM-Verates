import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

app.post("/analisar-noticia", async (req, res) => {
  try {
    const { noticia } = req.body;

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você retorna SOMENTE JSON válido com resumo, veracidade, confiabilidade e alertas.",
        },
        {
          role: "user",
          content: noticia,
        },
      ],
    });

    const text = response.choices[0].message.content;

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    const clean = text.substring(jsonStart, jsonEnd + 1);

    res.json(JSON.parse(clean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🔥 Backend rodando em http://localhost:3000");
});