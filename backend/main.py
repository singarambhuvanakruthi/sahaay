from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .ai import (
    ask_sahaay,
    simplify_text,
    explain_topic,
    translate_text,
    USE_MOCK,
    OPENAI_MODEL
)


app = FastAPI(
    title="SAHAAY API",
    description="AI Accessibility Companion",
    version="1.0.0"
)


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:5173"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# -----------------------------
# REQUEST MODELS
# -----------------------------

class QuestionRequest(BaseModel):
    question: str = Field(
        min_length=1,
        max_length=1000
    )
    language: str = "English"


class TextRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=5000
    )


class ExplainRequest(BaseModel):
    topic: str = Field(
        min_length=1,
        max_length=500
    )


class TranslateRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=5000
    )
    language: str


# -----------------------------
# BASIC ROUTES
# -----------------------------

@app.get("/")
def root():
    return {
        "message": "Welcome to SAHAAY API"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "mock_mode": USE_MOCK,
        "model": OPENAI_MODEL
    }


@app.get("/languages")
def languages():
    return {
        "languages": [
            {
                "name": "English",
                "code": "en-IN"
            },
            {
                "name": "Hindi",
                "code": "hi-IN"
            },
            {
                "name": "Telugu",
                "code": "te-IN"
            }
        ]
    }


# -----------------------------
# AI ROUTES
# -----------------------------

@app.post("/ask")
def ask(request: QuestionRequest):

    answer = ask_sahaay(
        request.question,
        language=request.language
    )

    return {
        "question": request.question,
        "language": request.language,
        "answer": answer
    }


@app.post("/simplify")
def simplify(request: TextRequest):

    answer = simplify_text(
        request.text
    )

    return {
        "original_text": request.text,
        "simplified_text": answer
    }


@app.post("/explain")
def explain(request: ExplainRequest):

    answer = explain_topic(
        request.topic
    )

    return {
        "topic": request.topic,
        "explanation": answer
    }


@app.post("/translate")
def translate(request: TranslateRequest):

    answer = translate_text(
        request.text,
        request.language
    )

    return {
        "text": request.text,
        "language": request.language,
        "translation": answer
    }
