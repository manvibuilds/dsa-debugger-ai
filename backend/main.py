from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGoogleGenerativeAI(
    model=os.getenv("GEMINI_MODEL"),
    google_api_key=os.getenv("GEMINI_API_KEY")
)

class DebugRequest(BaseModel):
    code: str
    error: str
    language: str = "python"

prompt = PromptTemplate(
    input_variables=["code", "error", "language"],
    template="""
You are a senior software engineer helping a student debug their DSA solution.

Language: {language}
Code:
{code}

Error/Failing case:
{error}

Respond in this exact format:

WHAT WENT WRONG:
[explain the bug in simple words, 2-3 lines]

ROOT CAUSE:
[explain why this happens technically, 2-3 lines]

FIX:
[show the corrected code only]

HOW TO AVOID THIS:
[one key lesson to remember, 1-2 lines]

CONFIDENCE: [High/Medium/Low] - [one line reason]
"""
)

@app.post("/debug")
async def debug_code(request: DebugRequest):
    chain = prompt | llm
    result = chain.invoke({
        "code": request.code,
        "error": request.error,
        "language": request.language
    })
    return {"result": result.content}

@app.get("/")
async def root():
    return {"message": "DSA Debugger API is running"}