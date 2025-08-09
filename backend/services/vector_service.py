from qdrant_client import QdrantClient, models
from sentence_transformers import SentenceTransformer

client = QdrantClient(":memory:")
encoder = SentenceTransformer('all-MiniLM-L6-v2')

def create_vector_store(collection_name: str):
    client.recreate_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=encoder.get_sentence_embedding_dimension(), distance=models.Distance.COSINE),
    )

def add_to_vector_store(collection_name: str, user_id: int, chunks: list):
    client.upload_points(
        collection_name=collection_name,
        points=[
            models.PointStruct(
                id=idx,
                vector=encoder.encode(chunk).tolist(),
                payload={"user_id": user_id, "text": chunk}
            )
            for idx, chunk in enumerate(chunks)
        ]
    )

def search_vector_store(collection_name: str, user_id: int, query: str):
    hits = client.search(
        collection_name=collection_name,
        query_vector=encoder.encode(query).tolist(),
        query_filter=models.Filter(must=[models.FieldCondition(key="user_id", match=models.MatchValue(value=user_id))]),
        limit=5
    )
    return [hit.payload['text'] for hit in hits]
