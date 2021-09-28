export default class ProductService {
    constructor(http) {
      this.http = http;
    }
  
    async getProducts(username) {
      const query = username ? `?username=${username}` : '';
      return this.http.fetch(`/products${query}`, {
        method: 'GET',
      });
    }
  
    async postProduct(productname, price, description, producturl) {
      return this.http.fetch(`/products`, {
        method: 'POST',
        body: JSON.stringify({productname, price, description, producturl}),
      });
    }
  
    async deleteProduct(ProductId) {
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'DELETE',
      });
    }
  
    async updateProduct(ProductId, product) {
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'PUT',
        body: JSON.stringify({ product }),
      });
    }
    
  
  
  }
  