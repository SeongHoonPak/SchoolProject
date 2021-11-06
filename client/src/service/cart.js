export default class CartService {
    constructor(http) {
      this.http = http;
    }
  
    async getProducts() {
      return this.http.fetch(`/carts`, {
        method: 'GET',
      });
    }
    async postProduct(productId) {
      return this.http.fetch(`/carts`, {
        method: 'POST',
        body: JSON.stringify({productId}),
      });
    }
    async deleteProduct(productId) {
      return this.http.fetch(`/carts`, {
        method: 'DELETE',
        body: JSON.stringify({productId}),
      });
    }
  
  }
  