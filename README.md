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
  - Topic-wise aptitude quizzes with instant results
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

```mermaid
graph TD
  subgraph Frontend (Next.js)
    A1[User Interface] --> A2[Login/Signup via Clerk]
    A1 --> A3[Upload Resume & JD]
    A1 --> A4[Start Interview Session]
    A1 --> A5[Take DSA & Aptitude Test]
    A1 --> A6[View Feedback & Roadmap]
  end

  subgraph Backend (Node.js API)
    B1[Authentication Middleware (Clerk)] --> B2[Session Validation]
    B2 --> B3[Resume & JD Handling]
    B2 --> B4[Interview Session Handler]
    B4 --> B5[Gemini API: Ask Questions]
    B4 --> B6[ElevenLabs TTS Engine]
    B4 --> B7[Audio Analyzer]
    B4 --> B8[Video Analyzer]
    B2 --> B9[DSA/Aptitude Evaluation]
    B2 --> B10[Feedback Generator]
    B2 --> B11[Roadmap Generator]
  end

  subgraph Database (Neon DB)
    D1[User Profiles]
    D2[Resume & JD Data]
    D3[Session Logs]
    D4[DSA Results]
    D5[Audio/Video Feedback]
    D6[Roadmaps]
  end

  A2 --> B1
  A3 --> B3 --> D2
  A4 --> B4 --> B5
  B5 --> D3
  B6 --> D3
  B7 --> D5
  B8 --> D5
  A5 --> B9 --> D4
  B10 --> D5
  B11 --> D6
  A6 --> D5
  A6 --> D6
```

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
