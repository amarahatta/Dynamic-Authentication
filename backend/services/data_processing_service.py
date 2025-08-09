from models.pydantic_schemas import UserData

def process_and_chunk_data(user_data: UserData):
    chunks = []
    for text in user_data.texts:
        chunks.append(f"Message from {text.sender}: {text.content}")
    for usage in user_data.app_usage:
        chunks.append(f"Used {usage.app_name} for {usage.duration}")
    for image in user_data.image_metadata:
        chunks.append(f"Image named {image.filename} with tags {', '.join(image.tags)}")
    for call in user_data.call_logs:
        chunks.append(f"{call.type.capitalize()} call with {call.contact} for {call.duration}")
    return chunks
