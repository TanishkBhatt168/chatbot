import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, isLoading, chatEndRef }) {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      
      {isLoading && (
        <div className="message-bubble-wrapper ai">
          <div className="message-content">
            <div className="avatar ai">AI</div>
            <div className="inner-text">
              <div className="typing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}
