export default class ProductService {
    constructor(http) {
      this.http = http;
    }
  
    async getProducts(username) {
      const query = username ? `?username=${username}` : '';
      return this.http.fetch(`/Products${query}`, {
        method: 'GET',
      });
    }
  
    async postProduct(productname, price, description) {
      return this.http.fetch(`/Products`, {
        method: 'POST',
        
        body: JSON.stringify({productname, price, description}),
      });
    }
  
    async deleteProduct(ProductId) {
      return this.http.fetch(`/Products/${ProductId}`, {
        method: 'DELETE',
      });
    }
  
    async updateProduct(ProductId, product) {
      return this.http.fetch(`/Products/${ProductId}`, {
        method: 'PUT',
        body: JSON.stringify({ product }),
      });
    }
    
  
  
  }
  