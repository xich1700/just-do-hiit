from typing import List, Literal
from pydantic import BaseModel, Field


class Block(BaseModel):
    exercise: str
    instruction: str = ""
    work_seconds: int = Field(gt=0)
    rest_seconds: int = Field(ge=0)
    rounds: int = Field(gt=0)


class SessionBase(BaseModel):
    name: str
    level: Literal["Beginner", "Intermediate", "Advanced"]
    blocks: List[Block]


class Session(SessionBase):
    id: str


class SessionSummary(BaseModel):
    id: str
    name: str
    level: str
    total_seconds: int


def total_seconds(blocks: List[Block]) -> int:
    return sum(b.rounds * (b.work_seconds + b.rest_seconds) for b in blocks)

