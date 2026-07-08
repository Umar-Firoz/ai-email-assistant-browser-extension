

# AI Email Assistant Browser Extension

An AI-powered Gmail assistant built using **Spring Boot**, **React**, **Google Gemini API**, and a **Chrome Extension** that helps users write, improve, summarize, and translate emails directly inside Gmail.

## Features

### Compose Mode
When composing or replying to an email inside Gmail:

- Generate AI-powered replies
- Fix grammar and improve writing quality
- Select reply tone:
  - Professional
  - Friendly
  - Formal
  - Casual

### Reading Mode (Popup)
When reading an email:

- Summarize long emails into concise points
- Translate emails into different languages
- View results directly inside the extension popup

## Supported Actions

| Action | Location |
|--------|----------|
| Reply Generation | Gmail Compose Window |
| Grammar Correction | Gmail Compose Window |
| Summarization | Extension Popup |
| Translation | Extension Popup |

---

## Tech Stack

### Frontend
- React
- TypeScript
- Material UI
- Axios

### Backend
- Java 21
- Spring Boot
- Spring AI
- REST APIs

### AI
- Google Gemini API

### Browser Extension
- Chrome Extension Manifest V3
- Content Scripts
- Popup UI
- Chrome Messaging API

---

## Project Structure

```text
ai-email/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── .mvn/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── email-extension/
│   ├── content.js
│   ├── content.css
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   └── manifest.json
│
└── README.md
```

---

## API Endpoint

### Generate AI Content

```http
POST /api/email/generate
```

### Request

```json
{
  "emailContent": "Thank you for reaching out regarding the position.",
  "action": "REPLY",
  "tone": "Professional",
  "language": ""
}
```

### Supported Actions

```text
REPLY
GRAMMAR
SUMMARIZE
TRANSLATE
```

### Response

```json
{
  "generatedEmail": "Thank you for your email. I appreciate your message..."
}
```

---

## Installation

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Chrome Extension

1. Open `chrome://extensions`
2. Enable Developer Mode.
3. Click `Load Unpacked`.
4. Select the `email-extension/` folder.
5. Open Gmail and start using the extension.

---

## Future Improvements

- Support for more languages
- Custom prompts
- One-click copy to clipboard
- Streaming AI responses
- User preferences and settings
- Outlook support
- Dark mode popup UI

---



## License

This project is licensed under the MIT License.