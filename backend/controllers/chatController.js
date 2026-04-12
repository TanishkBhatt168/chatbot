import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const prisma = new PrismaClient();

const generateTherapeuticResponse = async (userMessage) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { 
        response: "Oops, my Groq brain is unplugged! I need an API key to function.", 
        sentiment: "ERROR" 
      };
    }

    const groq = new Groq({ apiKey });

    // Use Llama 3 for best conversational flow
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a highly empathetic and supportive AI mental health chatbot. Respond to the user's feelings like a compassionate therapist friend. Do not offer medical diagnoses, just support, care, and practical small daily advice. Keep your responses thoughtful but concise (under 3 sentences per response so they don't get overwhelmed)."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1
    });

    const responseText = completion.choices[0]?.message?.content || "";
    return { response: responseText, sentiment: "GENERATIVE" };
  } catch (error) {
    console.error("Groq LLM Error:", error);
    return { response: "I'm having a little trouble connecting to my new Groq brain right now.", sentiment: "ERROR" };
  }
}

export const getChats = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { timestamp: 'asc' }
        }
      }
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chat' });
  }
};

export const createChat = async (req, res) => {
  try {
    const newChat = await prisma.chat.create({
      data: { title: "New Chat" }
    });
    return res.status(201).json(newChat);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create chat' });
  }
}

export const handleChat = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    
    if (!message || !chatId) {
      return res.status(400).json({ error: 'Message and chatId are required' });
    }

    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    await prisma.message.create({
      data: { chatId, role: 'user', content: message }
    });

    if (chat.title === "New Chat") {
       await prisma.chat.update({
          where: { id: chatId },
          data: { title: message.substring(0, 30) + (message.length > 30 ? "..." : "") }
       });
    }

    const localMlData = await generateTherapeuticResponse(message);
    const replyText = localMlData.response;

    await prisma.message.create({
      data: { chatId, role: 'ai', content: replyText }
    });
    
    return res.status(200).json({ reply: replyText, sentiment: localMlData.sentiment });

  } catch (error) {
    console.error('Error saving or processing request:', error);
    return res.status(500).json({ error: 'Internal Server Error', reply: 'Oops! The generative model crashed.' });
  }
};
