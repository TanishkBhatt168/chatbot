import express from 'express';
import { handleChat, getChats, getChatById, createChat } from '../controllers/chatController.js';

const router = express.Router();

router.get('/chats', getChats);
router.post('/chats', createChat);
router.get('/chats/:id', getChatById);
router.post('/chat', handleChat);

export default router;
