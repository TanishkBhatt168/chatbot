from transformers import pipeline

# Initialize a sentiment pipeline here. 
# We use distilbert finetuned on sst-2 for fast positive/negative binary classification.
try:
    sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Error loading model, falling back to mock: {e}")
    sentiment_model = None

# A simple keyword-based secondary classifier for specific emotions as an enhancement
EMOTION_KEYWORDS = {
    "sadness": ["sad", "depressed", "unhappy", "cry", "miserable", "lonely"],
    "anxiety": ["anxious", "nervous", "panic", "worried", "scared"],
    "stress": ["stressed", "overwhelmed", "pressure", "burnout", "exhausted"],
    "anger": ["angry", "mad", "frustrated", "furious", "annoyed"],
    "self_harm": ["kill myself", "suicide", "end it all", "want to die"]
}

def detect_emotion_keywords(text: str) -> str:
    text_lower = text.lower()
    
    for emotion, keywords in EMOTION_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text_lower:
                return emotion
                
    return "normal"

def analyze_sentiment(text: str):
    sentiment = "POSITIVE"
    
    if sentiment_model:
        result = sentiment_model(text)[0]
        sentiment = result['label'] # Usually 'POSITIVE' or 'NEGATIVE'
    
    # Check for specific strong emotions/keywords
    emotion = detect_emotion_keywords(text)
    
    # If the user typed something universally negative but sentiment model missed it:
    if emotion != "normal" and emotion != "anger":
        sentiment = "NEGATIVE"
        
    return sentiment, emotion
