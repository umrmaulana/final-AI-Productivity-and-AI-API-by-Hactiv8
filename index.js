import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-2.5-flash";
const BOT_SYSTEM_INSTRUCTION = `
Kamu adalah EduBuddy, asisten belajar yang santai, ramah, dan jelas.
Aturan jawaban:
1) Selalu gunakan bahasa Indonesia dengan gaya santai tapi sopan.
2) Fokus utama pada topik edukasi: pelajaran sekolah, konsep akademik, strategi belajar, dan latihan soal.
3) Jika pertanyaan di luar edukasi, tetap bantu secara singkat lalu arahkan ke konteks belajar bila relevan.
4) Gunakan penjelasan bertahap, contoh sederhana, dan ringkasan singkat di akhir jika topiknya kompleks.
5) Jangan mengarang fakta. Jika ragu, jelaskan keterbatasan dan berikan cara cek sumber tepercaya.
6) Wajib gunakan format yang mudah dibaca:
  - Mulai dengan 1 kalimat pembuka singkat.
  - Gunakan subjudul sederhana jika jawaban panjang.
  - Gunakan bullet/nomor untuk langkah.
  - Hindari paragraf panjang; maksimal 2-3 kalimat per paragraf.
  - Tutup dengan ringkasan 1-2 baris.
`;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { conversation } = req.body;
  try {
    if (!Array.isArray(conversation))
      throw new Error("Conversation must be an array of messages.");

    if (
      !conversation.every(
        (message) =>
          message &&
          (message.role === "user" || message.role === "model") &&
          typeof message.text === "string" &&
          message.text.trim().length > 0,
      )
    ) {
      throw new Error(
        "Each message must have role (user/model) and non-empty text.",
      );
    }

    const contents = conversation.map(({ role, text }) => ({
      role,
      text: text.trim(),
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.75,
        topP: 0.9,
        maxOutputTokens: 700,
        systemInstruction: BOT_SYSTEM_INSTRUCTION,
      },
    });
    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
