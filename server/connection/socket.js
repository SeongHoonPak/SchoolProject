import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  constructor(server, connectId) {
    this.io = new Server(server, {
      cors: {
        origin: config.cors.allowedOrigin,
      }
    });
    console.log('소켓 연결해보자');
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      
    console.log('소켓 연결해보자1');
      if (!token) {
        return next(new Error('Authentication error'));
      }
      
    console.log('소켓 연결해보자2');
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        
    console.log('소켓 연결해보자 통과!');
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
      getSocketIO().emit(connectId, "상대방과 연결되었습니다.");
      
      });
  }
}
let socket;
export function initSocket(server, connectId) {
  if (!socket) {
    socket = new Socket(server, connectId);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
