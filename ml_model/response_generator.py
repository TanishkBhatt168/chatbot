import random

# A predefined set of compassionate responses for specific circumstances.
# A real implementation could use a Generative LLM for this step, but static templates
# paired with sentiment routing guarantees therapeutic safety and predictability as requested.

RESPONSES = {
    "sadness": [
        "I'm really sorry you're feeling this way. It's completely okay to feel sad. Is there anything specific that triggered this?",
        "I hear you. Feeling sad can be incredibly heavy. Please remember to be gentle with yourself today.",
        "That sounds really tough. While I'm just an AI, I want you to know your feelings are valid. Would talking more about it help?"
    ],
    "anxiety": [
        "It sounds like you're dealing with a lot of anxiety right now. Sometimes taking a few deep breaths can help center you.",
        "I understand how anxiety can make your thoughts race. Try focusing on the present moment. Can you name 3 things you see around you?",
        "Anxiety can be exhausting. Remember that this feeling is temporary and it will pass. I'm here to listen."
    ],
    "stress": [
        "I understand how you're feeling. Sometimes stress can feel overwhelming. Taking small breaks, breathing exercises, or talking to someone you trust can really help.",
        "It sounds like you're carrying a heavy load right now. Please remember to take a step back and rest. You can't pour from an empty cup.",
        "Stress is difficult to manage on your own. What is one small thing you can do for yourself today to relax?"
    ],
    "anger": [
        "It's completely normal to feel angry sometimes. Taking a short walk or just venting here can help release that tension.",
        "I can hear the frustration in your words. Your feelings are entirely valid. Whenever you're ready, I'm here to listen."
    ],
    "normal": [
        "That sounds interesting! Tell me more about how you're experiencing things today.",
        "I'm here to support you. How has your week been going generally?",
        "It's great to check in. What's been on your mind lately?"
    ],
    "positive": [
        "I'm so glad to hear that! It's wonderful when we have good days.",
        "That sounds really positive! Cherish these moments.",
        "Thank you for sharing that with me, it sounds like things are going well."
    ]
}

SAFETY_MESSAGE = (
    "It sounds like you are going through a profoundly difficult time. "
    "Please know that you are not alone and there is support available. "
    "Consider reaching out to a professional or contacting the National Suicide and Crisis Lifeline by dialing or texting 988. "
    "Your life has immense value."
)

def generate_response(user_text: str, sentiment: str, emotion: str) -> str:
    """
    Generates a response tailored to the detected emotion and sentiment.
    """
    
    if emotion == "self_harm":
        return SAFETY_MESSAGE
        
    if sentiment == "NEGATIVE":
        if emotion in RESPONSES:
            return random.choice(RESPONSES[emotion])
        else:
            return "I'm sorry you're going through a challenging time. I'm here to listen. Can you tell me more about what's bothering you?"
            
    else:
        # Sentiment is Positive
        if emotion != "normal":
            # Conflicting (Positive sentiment with stressed keywords)
            return random.choice(RESPONSES["normal"])
        return random.choice(RESPONSES["positive"])
