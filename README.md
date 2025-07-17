# 🧠 Prepmate – AI-Based Mock Interview Platform

Prepmate is a full-stack, AI-powered mock interview platform designed to simulate real interview experiences using voice, video, and intelligent question flow. It analyzes the candidate’s performance in real time, provides personalized feedback, and helps users build confidence with integrated DSA and aptitude preparation modules.

---

## 🚀 Features

- 🔐 **Clerk Authentication** for secure login and user management
- 💬 **AI-powered Interview** with:
  - Role and JD-based dynamic questions via **Gemini API**
  - Realistic voice interaction using **ElevenLabs TTS**
  - Follow-up counter-questioning
- 🎥 **Video Analyser**:
  - Confidence
  - Posture
  - Engagement level
- 🎧 **Audio Analyser**:
  - Tone detection
  - Grammar correction
  - Fluency scoring
- 🧠 **DSA + Aptitude Learning Module**:
  - Roadmap-based progress tracking
  - DSA coding questions with test case validation
```mermaid
graph TD
  %% Frontend Section
  subgraph Frontend_NextJS
    A1[User Interface]
    A2[Login / Signup via Clerk]
    A3[Enter JD and Role]
    A4[Start Interview Session]
    A5[Take DSA & Aptitude Tests]
    A6[View Feedback & Roadmap]
  end

  %% Backend Section
  subgraph Backend_NodeJS
    B1[Authentication Middleware - Clerk]
    B2[Session Validation]
    B3[JD Handler]
    B4[Interview Engine]
    B5[Gemini API - Question Generator]
    B6[ElevenLabs TTS - Voice Output]
    B7[Audio Analyzer]
    B8[Video Analyzer]
    B9[DSA/Aptitude Evaluator]
    B10[Feedback Generator]
    B11[Roadmap Manager]
  end

  %% Database Section
  subgraph NeonDB_Postgres
    D1[Users Table]
    D2[JD & Session Logs]
    D3[Audio/Video Feedback]
    D4[DSA Results]
    D5[Aptitude Results]
    D6[Roadmap Data]
  end

  %% Flow Connections
  A2 --> B1
  A3 --> B3 --> D2
  A4 --> B4 --> B5
  B5 --> D2
  B6 --> D2
  B7 --> D3
  B8 --> D3
  A5 --> B9 --> D4
  B10 --> D3
  B11 --> D6
  A6 --> D3
  A6 --> D6
```  - Topic-wise aptitude quizzes with instant results
- 📊 **Personalized Feedback Report**:
  - Highlights strengths and weaknesses
  - Suggests improvements
- ☁️ **Serverless Database**: Using **Neon DB (PostgreSQL)** with **Drizzle ORM**

---

## 🧱 Tech Stack

| Layer            | Technology                          |
|------------------|--------------------------------------|
| Frontend         | Next.js, React, Tailwind CSS         |
| Backend/API      | Next.js API Routes                   |
| Authentication   | Clerk                                |
| Voice AI         | ElevenLabs API                       |
| Interview Logic  | Gemini API (LLM for question gen)    |
| Analysis Engine  | Custom Audio & Video Analyser        |
| Database         | Neon DB (Serverless PostgreSQL)      |
| ORM              | Drizzle ORM                          |

---

## 🧠 System Architecture



---

## 🗃️ Database Schema (ER Diagram)

```mermaid
erDiagram
    User ||--o{ Session : has
    User {
        string id PK
        string email
        string name
        string auth_provider
    }

    Session {
        string id PK
        string userId FK
        timestamp startedAt
        timestamp endedAt
    }

    Feedback {
        string id PK
        string sessionId FK
        float confidenceScore
        float fluencyScore
        string grammarFeedback
        text overallSuggestions
    }

    DSA_Question {
        string id PK
        string topic
        text question
        text sampleInput
        text sampleOutput
    }

    DSA_Attempt {
        string id PK
        string userId FK
        string questionId FK
        text submittedCode
        boolean passed
        timestamp attemptedAt
    }

    Aptitude_Quiz {
        string id PK
        string topic
        text question
        text options
        string correctAnswer
    }

    Aptitude_Result {
        string id PK
        string userId FK
        string quizId FK
        boolean isCorrect
        timestamp attemptedAt
    }
```

---

## 📁 Folder Structure

```
my-nextjs-app/
├── (auth)/                          # Clerk authentication pages
├── dashboard/                       # Interview dashboard
│   ├── _components/
│   ├── AddNewInterview.jsx
│   ├── FeedbackReport.jsx
├── dsa-roadmap/                     # DSA and aptitude modules
│   ├── roadmap.jsx
│   ├── quiz.jsx
│   └── test-cases.jsx
├── api/
│   ├── ask-question.js              # Gemini API
│   ├── elevenlabs-tts.js           # ElevenLabs voice synthesis
│   ├── store-feedback.js           # Save feedback
│   ├── dsa-submit.js               # Run test cases
├── utils/
│   ├── audioAnalyser.js            # Audio feedback logic
│   ├── videoAnalyser.js            # Webcam feedback logic
├── models/                         # Drizzle ORM models
├── styles/
├── public/
└── README.md
```

---

## 🔐 Environment Variables (`.env.local`)

```env
DATABASE_URL=postgresql://user:pass@db.neon.tech/db
CLERK_SECRET_KEY=your_clerk_key
CLERK_FRONTEND_API=your_clerk_frontend_key
GEMINI_API_KEY=your_gemini_key
ELEVENLABS_API_KEY=your_elevenlabs_key
```

---

## 📊 Feedback Includes

- Confidence score (video)
- Fluency, tone, grammar (audio)
- AI-generated suggestions
- DSA + Aptitude performance
- Personalized roadmap updates

---

## 🧪 Sample DSA Workflow

1. User selects a topic (e.g., Arrays)
2. Views a DSA problem and submits code
3. Backend runs code against test cases
4. Returns pass/fail status with explanation
5. Stores result in Neon DB for progress tracking

---

## ✨ Future Enhancements

- 🤖 AI Avatars with real-time lip sync
- 📽️ Auto-generated video summaries of interviews
- 📈 Adaptive roadmap suggestions based on weak areas
- 🧑‍💼 HR + Tech + Managerial mock simulation rounds

---

## 👨‍💻 Built By

**Kunal Puri**  
AI x Web Engineer | E-Cell Leader | Product Innovator  
[LinkedIn](https://linkedin.com/in/kunalpuri) | [GitHub](https://github.com/kunalpuri)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
