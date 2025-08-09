from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import pydantic_schemas
from services import user_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users/", response_model=pydantic_schemas.User)
def create_user(username: str, db: Session = Depends(get_db)):
    return user_service.create_user(db=db, username=username)

@router.get("/users/", response_model=list[pydantic_schemas.User])
def get_users(db: Session = Depends(get_db)):
    users = user_service.get_users(db=db)
    return users