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
      console.log('openChat 시도',orderId, `/chats/${orderId}`);
      console.log('cc',this.http)
        return this.http.fetch(`/chats/${orderId}`, {
          method: 'POST',
          body: JSON.stringify({orderId}),
        });
      }
  
    async postChat(text,productId, orderId) {
      console.log('채팅생성');
        return this.http.fetch(`/chats`, {
          method: 'POST',
          body: JSON.stringify({ text,productId, orderId }),
        });
      }
    async deleteProduct(ProductId) {
      console.log('삭제 실행');
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'DELETE',
      });
    }
  
    onSync(callback,connectId) {
        return this.socket.onSync(connectId, callback);
      }
    
  
  
  }
  