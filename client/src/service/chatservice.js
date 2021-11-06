export default class ChatService {
    constructor(http, socket) {
      this.http = http;
      this.socket = socket;
    }

    async getChat(id) { 
        return this.http.fetch('/chats/'+id, {
          method: 'GET',
        });
      }
     
    async postopenChat(orderId) {
        return this.http.fetch(`/chats/${orderId}`, {
          method: 'POST',
          body: JSON.stringify({orderId}),
        });
      }
  
    async postChat(text,productId, orderId) {
        return this.http.fetch(`/chats`, {
          method: 'POST',
          body: JSON.stringify({ text,productId, orderId }),
        });
      }
    async deleteChat(orderId) {
      return this.http.fetch(`/chats/${orderId}`, {
        method: 'DELETE',
      });
    }
  
    onSync(callback,connectId) {
        return this.socket.onSync(connectId, callback);
      }
    
  
  
  }
  