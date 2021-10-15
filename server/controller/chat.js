import { getSocketIO } from '../connection/socket.js';
import * as chatRepository from '../data/Chat.js';





export async function getChat(req, res, next) {
    console.log('getzzz');
    const id = req.params.id;
    const chat = await chatRepository.getByChatId(id);
    console.log('chatch',chat);
    res.status(200).json(chat)
     
  }


export async function createChat(req, res, next) {
    const { text,productId, orderId,connectId } = req.body;
    const chat = await chatRepository.create(text,productId, orderId, req.userId);
    res.status(201).json(chat);
    console.log('이거보낸다',chat);
    console.log('connectId?',connectId);
    getSocketIO().emit(connectId, chat);
  }