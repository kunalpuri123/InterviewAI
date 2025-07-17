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
    subgraph CLIENT
        A[User]
        B[Next.js UI]
        C[Clerk Auth]
    end

    subgraph BACKEND
        D[Next.js API Routes]
        E[Gemini API - AI Question Generator]
        F[ElevenLabs TTS - AI Voice]
        G[Audio Analyser]
        H[Video Analyser]
        I[DSA + Aptitude Module]
    end

    subgraph DATABASE
        J[Neon DB (Serverless PostgreSQL)]
    end

    %% Auth Flow
    A --> C
    C --> B

    %% Interview Flow
    A -->|Enter JD & Role| B
    B -->|Send JD + Role| E
    E -->|Returns AI Question| B
    B -->|Send to TTS| F
    F -->|Return voice| B
    B --> A

    %% Response Flow
    A -->|Answers| B
    B -->|Video Analysis| H
    B -->|Audio Analysis| G
    H --> B
    G --> B

    %% Data Save
    B -->|Send Results| D
    D -->|Save Feedback| J

    %% DSA Roadmap Flow
    A -->|Open Roadmap| B
    B -->|Fetch DSA Topics| I
    I -->|Submit Code + Quizzes| D
    D -->|Store DSA Score| J

    %% Feedback Flow
    B -->|Get Final Report| D
    D -->|Fetch Data| J
    D --> B
    B --> A
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
