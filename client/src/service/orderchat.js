export default class OrderChatService {
    constructor(http, socket) {
      this.http = http;
      this.socket = socket;
    }

    async getChat(id) { 
        return this.http.fetch('/chats/'+id, {
          method: 'GET',
        });
      }
  
  
    async postOrder(productId) {
      console.log('ORDER 찍어볼게',productId);
      return this.http.fetch(`/orders`, {
        method: 'POST',
        body: JSON.stringify({productId}),
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
  
    onSync(callback) {
        return this.socket.onSync('chats', callback);
      }
    
  
  
  }
  