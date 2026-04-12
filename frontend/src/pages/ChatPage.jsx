import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load chat history on initial render
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/chats');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
        if (data.length > 0) {
          loadChat(data[0].id);
        } else {
          startNewChat();
        }
      }
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const loadChat = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/chats/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentChatId(data.id);
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load chat session", err);
    }
  }

  const startNewChat = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/chats', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setCurrentChatId(data.id);
        setMessages([{
          role: 'ai',
          content: "Hello! I'm here to listen. How are you feeling today?",
          timestamp: new Date().toISOString()
        }]);
        // reload sidebar
        fetchChats();
      }
    } catch(err) {
      console.error("Failed to make new chat", err);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || !currentChatId) return;

    const newUserMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, chatId: currentChatId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const aiResponse = {
        role: 'ai',
        content: data.reply || "I'm having trouble connecting to my brain right now.",
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, aiResponse]);
      
      // reload sidebar as title might have updated 
      fetchChats();
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, {
        role: 'ai',
        content: "Oops! Something went wrong on my end. Please try again later.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar 
        history={history} 
        onNewChat={startNewChat} 
        onSelectChat={loadChat}
        currentChatId={currentChatId}
      />
      <div className="chat-page">
        <ChatWindow messages={messages} isLoading={isLoading} chatEndRef={chatEndRef} />
        <InputBox onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </>
  );
}
