# services/llm_service.py
import os
import google.generativeai as genai
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API key
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable not set.")
genai.configure(api_key=api_key)

# Initialize the Gemini Flash model
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_quiz_question(context: list[str]):
    """
    Calls the Google Gemini Flash model to generate a quiz question.
    """
    if not context:
        # Fallback if no context is retrieved
        return {
            "question": "What is the capital of France?",
            "choices": [
                {"id": 1, "text": "Paris"},
                {"id": 2, "text": "London"},
                {"id": 3, "text": "Berlin"},
            ],
            "correct_choice_id": 1,
        }

    # Combine the retrieved context into a single string
    context_str = "\n".join(context)

    # Create a prompt for the LLM
    prompt = f"""
    Based on the following user data, create a fun, witty, or surprising multiple-choice quiz question.
    The user should be able to answer it based on their own data.

    User Data:
    ---
    {context_str}
    ---

    The question should have one correct answer and two plausible but incorrect distractors.

    Return the output as a single, minified JSON object with no newlines or formatting.
    The JSON object must have these exact keys: "question", "choices", "correct_choice_id".
    - "question": A string containing the quiz question.
    - "choices": A list of 3 dictionaries, where each dictionary has an "id" (integer 1, 2, or 3) and a "text" (string).
    - "correct_choice_id": The integer "id" of the correct choice.

    Example Output:
    {{"question":"Which app did you use the longest last Tuesday?","choices":[{{ "id": 1, "text": "YouTube"}},{{ "id": 2, "text": "Chrome"}},{{ "id": 3, "text": "Gmail"}}],"correct_choice_id":1}}
    """

    try:
        # Generate content using the model
        response = model.generate_content(prompt)
        
        # Clean up the response and parse the JSON
        # The model sometimes wraps the JSON in ```json ... ```
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "").strip()
        
        quiz_data = json.loads(cleaned_response)

        # ensure the structure is correct
        if not all(k in quiz_data for k in ["question", "choices", "correct_choice_id"]):
            raise ValueError("LLM response is missing required keys.")
        if len(quiz_data["choices"]) != 3:
            raise ValueError("LLM response does not have 3 choices.")

        return quiz_data

    except (json.JSONDecodeError, ValueError, Exception) as e:
        print(f"Error processing LLM response: {e}")
        return {
            "question": "Which of your contacts did you call most recently?",
            "choices": [
                {"id": 1, "text": "Mom"},
                {"id": 2, "text": "Work"},
                {"id": 3, "text": "Best Friend"},
            ],
            "correct_choice_id": 1,
        }