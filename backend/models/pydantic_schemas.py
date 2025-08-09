from pydantic import BaseModel
from typing import List, Optional

class TextData(BaseModel):
    sender: str
    content: str
    timestamp: str

class AppUsageData(BaseModel):
    app_name: str
    duration: str
    timestamp: str

class ImageMetadata(BaseModel):
    filename: str
    location: Optional[str] = None
    tags: List[str] = []

class CallLogData(BaseModel):
    contact: str
    duration: str
    type: str
    timestamp: str

class UserData(BaseModel):
    user_id: int
    texts: List[TextData] = []
    app_usage: List[AppUsageData] = []
    image_metadata: List[ImageMetadata] = []
    call_logs: List[CallLogData] = []

class User(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class Choice(BaseModel):
    id: int
    text: str

class QuizQuestion(BaseModel):
    question: str
    choices: List[Choice]
    correct_choice_id: int
