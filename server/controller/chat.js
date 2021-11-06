import server from '../app.js';
import { getSocketIO, initSocket } from '../connection/socket.js';
import * as chatRepository from '../data/Chat.js';


export async function getChat(req, res, next) {
    const id = req.params.id;
    const chat = await chatRepository.getByChatId(id);
    res.status(200).json(chat)
  }


export async function openChat(req, res, next) {
    const { orderId } = req.body;
    initSocket(server,orderId)
    res.sendStatus(200)     
  }


export async function createChat(req, res, next) {
    const { text,orderId } = req.body;
    const chat = await chatRepository.create(text,req.userId,orderId);
    
    res.status(201).json(chat);
    getSocketIO().emit(orderId, chat);
  }


export async function removeChat(req, res, next) {
    const id = req.params.id;
    const Chat = await chatRepository.getByChatId(id);
    if (!Chat) {
      return res.status(404).json({ message: `Chat not found: ${id}` });
    }
    await chatRepository.remove(id);
    res.sendStatus(204);
  }