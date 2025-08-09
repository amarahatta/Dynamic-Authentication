from fastapi import FastAPI
from database import engine, Base
from routers import user, data_ingestion, quiz
from services import vector_service

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Create the vector store collection on startup
@app.on_event("startup")
def startup_event():
    vector_service.create_vector_store(collection_name="user_data_collection")

app.include_router(user.router)
app.include_router(data_ingestion.router)
app.include_router(quiz.router)

@app.get("/")
def read_root():
    return {"message": "Dynamic Authentication"}
