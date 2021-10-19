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



  export async function openChat(req, res, next) {
    const { orderId } = req.body;
    
    console.log('채팅 오픈 시도open',orderId);
    initSocket(server,orderId)

    res.sendStatus(200)
    
     
  }


export async function createChat(req, res, next) {
    console.log("채팅생성시도")
    const { text,orderId } = req.body;
    const chat = await chatRepository.create(text,req.userId,orderId);
    console.log('이거보낸다',chat);
    
    res.status(201).json(chat);
    getSocketIO().emit(orderId, chat);
  }