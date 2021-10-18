export default class OrderService {
    constructor(http, socket) {
      this.http = http;
      this.socket = socket;
    }

    async getSellOrder() { 
      return this.http.fetch('/orders/', {
        method: 'GET',
      });
    }
    
      async getOrder(id) { 
        return this.http.fetch('/orders/'+id, {
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
  
  
    onSync(callback,connectId) {
        return this.socket.onSync(connectId, callback);
      }
    
  
  
  }
  