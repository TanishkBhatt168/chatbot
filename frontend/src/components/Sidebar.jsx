import React from 'react';

export default function Sidebar({ history, onNewChat, onSelectChat, currentChatId }) {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={onNewChat}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New chat
      </button>

      <div className="history-list">
        {history.map((chat) => (
          <div 
            key={chat.id} 
            className="history-item"
            style={{ 
              backgroundColor: chat.id === currentChatId ? 'var(--sidebar-hover)' : 'transparent' 
            }}
            onClick={() => onSelectChat(chat.id)}
          >
             <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
             </svg>
             {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
