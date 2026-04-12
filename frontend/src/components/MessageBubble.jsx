import React from 'react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble-wrapper ${isUser ? 'user' : 'ai'}`}>
      <div className="message-content">
        <div className={`avatar ${isUser ? 'user' : 'ai'}`}>
          {isUser ? 'U' : 'AI'}
        </div>
        <div className="inner-text">
          {message.content}
          {message.timestamp && (
            <span className="timestamp">{formatTime(message.timestamp)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
