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
    async getProduct(product_id) {
      let query = product_id & `${product_id}` 
      // query = seller_id ?  seller_id : '';
      return this.http.fetch(`/products/${query}`, {
        method: 'GET',
      });
    }
    async postProduct(product) {
      const {name, price, description, producturls}= product;
      return this.http.fetch(`/products`, {
        method: 'POST',
        body: JSON.stringify({name, price, description, producturls}),
      });
    }
  
    async deleteProduct(ProductId) {
      console.log('삭제 실행');
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'DELETE',
      });
    }
  
    async updateProduct(ProductId, productname, price, description, producturl) {
      console.log('업데이트 실행',ProductId, productname, price, description, producturl);
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'PUT',
        body: JSON.stringify({ productname, price, description, producturl }),
      });
    }
    
  
  
  }
  