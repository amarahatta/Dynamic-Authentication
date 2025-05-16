from flask import Flask, jsonify
from flask_cors import CORS
from genai import generate_question

app = Flask(__name__)
CORS(app)

@app.route("/generate-question", methods=["GET"])
def generate():
    try:
        question_data = generate_question()
        if not question_data or "question" not in question_data:
            return jsonify({"error": "Failed to generate valid question"}), 500
        return jsonify(question_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
