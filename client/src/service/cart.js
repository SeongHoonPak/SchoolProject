export default class CartService {
    constructor(http) {
      this.http = http;
    }
  
    async getProducts() {
      console.log('getPro 실행');
      return this.http.fetch(`/carts`, {
        method: 'GET',
      });
    }
    async postProduct(productId) {
      console.log('post 실행');
      return this.http.fetch(`/carts`, {
        method: 'POST',
        body: JSON.stringify({productId}),
      });
    }
    async deleteProduct(productId) {
      console.log('delete 실행');
      return this.http.fetch(`/carts`, {
        method: 'DELETE',
        body: JSON.stringify({productId}),
      });
    }
  
  }
  