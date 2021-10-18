import server from '../app.js';
import { getSocketIO, initSocket } from '../connection/socket.js';
import * as chatRepository from '../data/Chat.js';





export async function getChat(req, res, next) {
    console.log('getzzz');
    const id = req.params.id;
    console.log('id chz',id)
    const chat = await chatRepository.getByChatId(id);
    console.log('chatch',chat);
    res.status(200).json(chat)
     
  }

  export async function getOwner(req, res, next) {
    console.log('owner');
    const chat = await chatRepository.getOwner(req.userId);
    console.log('chatch',chat);
    res.status(200).json(chat)
     
  }


  export async function openChat(req, res, next) {
    const { orderId } = req.body;
    
    console.log('채팅 오픈 시도open',orderId);
    initSocket(server,orderId)

    res.sendStatus(200)
    
     
  }


export async function createChat(req, res, next) {
    console.log("채팅생성시도")
    const { text,productId, orderId } = req.body;
    console.log(text,productId, orderId)
    const chat = await chatRepository.create(text,productId, orderId, req.userId);
    res.status(201).json(chat);
    console.log('이거보낸다',chat);
    console.log('connectId?',orderId);
    getSocketIO().emit(orderId, chat);
  }