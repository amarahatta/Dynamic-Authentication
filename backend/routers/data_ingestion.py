from fastapi import APIRouter, Depends
from models.pydantic_schemas import UserData
from services import data_processing_service, vector_service

router = APIRouter()

@router.post("/data/")
def ingest_data(user_data: UserData):
    chunks = data_processing_service.process_and_chunk_data(user_data)
    vector_service.add_to_vector_store(
        collection_name="user_data_collection", 
        user_id=user_data.user_id, 
        chunks=chunks
    )
    return {"message": "Data ingested successfully"}
