from sqlalchemy.orm import Session
from models import db_models, pydantic_schemas
from models.db_models import User

def create_user(db: Session, username: str):
    db_user = db_models.User(username=username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(db_models.User).all()
