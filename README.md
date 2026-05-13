# final AI Productivity and AI API by Hactiv8

Simple chatbot web app using Node.js + Express (backend) and Vanilla JavaScript (frontend), integrated with Google Gemini API.

## Features

- Chat UI in browser
- Express API endpoint at `/api/chat`
- Gemini response generation
- Static frontend served from `public/`

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

Current success response:

```json
{
  "response": "<gemini_ai_response>"
}
```

Error response:

```json
{
  "error": "Failed to generate content."
}
```

## Notes

- Frontend sends chat history as `conversation` to preserve context.
- System instruction is configured in backend to answer in Bahasa Indonesia.
