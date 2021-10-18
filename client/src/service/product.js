export default class ProductService {
    constructor(http) {
      this.http = http;
    }
  
    async getProducts(username) {
      const query = username ? `?username=${username}` : '';
      console.log(query);
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
    async postProduct(product, producturls) {
      console.log('post 찍어볼게',product, 'url',producturls);
      const {name, price, description,area}= product;
      return this.http.fetch(`/products`, {
        method: 'POST',
        body: JSON.stringify({name, price, description, producturls,area}),
      });
    }
  


    async deleteProduct(ProductId) {
      console.log('삭제 실행');
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'DELETE',
      });
    }
  
    async updateProduct(product, producturl) {
      const {id, name, price, description}= product;
      
      
      console.log('업데이트 실행');
      return this.http.fetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, description, producturl }),
      });
    }
    

  async getChatProduct(product_id) {
      let query = product_id & `${product_id}` 
      // query = seller_id ?  seller_id : '';
      return this.http.fetch(`/products/${query}`, {
        method: 'GET',
      });
    }
  
  }
  