from sentiment import analyze_sentiment
from response_generator import generate_response

def get_bot_response(user_text: str):
    """
    Main orchestrator for understanding user text and generating bot response.
    """
    # 1. Analyze sentiment and classify potential emotional state
    sentiment_result, emotion = analyze_sentiment(user_text)
    
    # 2. Generate response based on sentiment and emotion
    response = generate_response(user_text, sentiment_result, emotion)
    
    return response, sentiment_result
