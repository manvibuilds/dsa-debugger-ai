# DSA Debugger AI 🐛→✅

Paste your failing LeetCode solution and get an explanation of **why** it failed — not just a fix.

## What it does

Most developers paste errors into ChatGPT and get generic fixes. This tool explains the **root cause**, the **DSA pattern** behind the bug, and **how to avoid it next time**.

## Tech Stack

- **Backend:** FastAPI + LangChain + Gemini API (gemini-2.5-flash)
- **Frontend:** React + Tailwind CSS + Vite
- **AI:** Structured prompt engineering for consistent debugging output

## How to Run

**Backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Add your `GEMINI_API_KEY` in `backend/.env`.

## Built by

Manvi 
