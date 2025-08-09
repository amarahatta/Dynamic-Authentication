from fastapi import APIRouter
from services import vector_service, llm_service
from models.pydantic_schemas import QuizQuestion

router = APIRouter()

@router.get("/quiz/{user_id}", response_model=QuizQuestion)
def get_quiz_question(user_id: int):
    # generate a more specific query based on user context.
    query = "a fun fact"
    context = vector_service.search_vector_store(
        collection_name="user_data_collection", 
        user_id=user_id, 
        query=query
    )
    return llm_service.generate_quiz_question(context)
