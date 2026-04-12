from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from model import get_bot_response

app = FastAPI(title="Mental Health ML API")

class ChatRequest(BaseModel):
    text: str

class ChatResponse(BaseModel):
    response: str
    sentiment: str

@app.post("/predict", response_model=ChatResponse)
async def predict_chat(request: ChatRequest):
    # Process text through our model
    reply, detected_sentiment = get_bot_response(request.text)
    
    return ChatResponse(
        response=reply,
        sentiment=detected_sentiment
    )

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
