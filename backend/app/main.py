from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.catalog import CATALOG
from app.models import Session, SessionSummary, total_seconds

app = FastAPI(title="just-do-hiit")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/sessions", response_model=list[SessionSummary])
def list_sessions():
    return [
        SessionSummary(
            id=s.id,
            name=s.name,
            level=s.level,
            total_seconds=total_seconds(s.blocks),
        )
        for s in CATALOG
    ]


@app.get("/api/sessions/{session_id}", response_model=Session)
def get_session(session_id: str):
    for s in CATALOG:
        if s.id == session_id:
            return s
    raise HTTPException(status_code=404, detail="Session not found")
