# final AI Productivity and AI API by Hactiv8

Chatbot edukasi berbasis AI menggunakan Node.js + Express (backend) dan Vanilla JavaScript (frontend), terintegrasi dengan Google Gemini API.

Bot ini berperan sebagai asisten belajar santai bernama EduBot: fokus pada topik edukasi, penjelasan bertahap, dan jawaban yang mudah dibaca.

## Features

- Education bot persona (gaya santai, ramah, fokus edukasi)
- Chat UI dark-blue modern dan responsif (desktop + mobile)
- Quick prompts untuk memulai pertanyaan belajar
- Express API endpoint di `/api/chat`
- Riwayat percakapan dikirim sebagai `conversation` agar konteks tetap terjaga
- Format respons AI dioptimalkan agar lebih mudah dibaca (bullet, paragraf pendek, ringkasan)
- Frontend statis disajikan dari folder `public/`

## Project Structure

```bash
gemini-chatbot-api/
  index.js
  package.json
  public/
    index.html
    script.js
    style.css
```

## Requirements

- Node.js 18+
- Gemini API key

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` file in project root:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the server:
   ```bash
   node index.js
   ```

Server runs at:

- `http://localhost:3001`

## API

### POST `/api/chat`

Request body:

```json
{
  "conversation": [
    { "role": "user", "text": "Halo" },
    { "role": "model", "text": "Hai, ada yang bisa saya bantu?" },
    { "role": "user", "text": "Jelaskan AI" }
  ]
}
```

Success response:

```json
{
  "result": "<gemini_ai_response>"
}
```

Error response:

```json
{
  "error": "Failed to generate content."
}
```

## Notes

- Frontend mengirim chat history sebagai `conversation` untuk menjaga konteks.
- Role message yang valid: `user` dan `model`.
- Backend menggunakan system instruction khusus Education Bot berbahasa Indonesia.
- Jika ingin ubah karakter bot, edit variabel `BOT_SYSTEM_INSTRUCTION` di `index.js`.

## Use Case

Education Bot untuk membantu:

- Menjelaskan konsep pelajaran sekolah/kuliah
- Membuat jadwal belajar
- Memberi contoh soal dan pembahasan
- Menyusun strategi belajar menjelang ujian
