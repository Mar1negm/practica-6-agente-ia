const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5500",
    "X-Title": "Chat con Agente IA"
  }
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Backend del agente IA funcionando." });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Escribe un mensaje para continuar." });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "Falta configurar OPENROUTER_API_KEY en el archivo .env."
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter((item) =>
            item &&
            ["user", "assistant"].includes(item.role) &&
            typeof item.content === "string"
          )
          .slice(-20)
      : [];

    const completion = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      messages: [
        ...safeHistory,
        { role: "user", content: message.trim() }
      ]
    });

    const reply = completion.choices?.[0]?.message?.content;
    return res.json({
      reply: typeof reply === "string" ? reply : "No se recibió una respuesta de la IA."
    });
  } catch (error) {
    console.error("Error al comunicarse con OpenRouter:", error.message);
    return res.status(500).json({
      error: "No se pudo procesar el mensaje. Revisa la API key y vuelve a intentarlo."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
