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
      return this.http.fetch(`/products/${query}`, {
        method: 'GET',
      });
    }

    async getArea(area){
      return this.http.fetch(`/products/area/${encodeURIComponent(area)}`, {
        method: 'GET',
      });
      
    }

    async Search(search){
      
      return this.http.fetch(`/products/search/${search}`, {
        method: 'GET',
      });
      
    }

    async postProduct(product, producturls) {
      const {name, price, description,area}= product;
      return this.http.fetch(`/products`, {
        method: 'POST',
        body: JSON.stringify({name, price, description, producturls,area}),
      });
    }
  


    async deleteProduct(ProductId) {
      return this.http.fetch(`/products/${ProductId}`, {
        method: 'DELETE',
      });
    }
  
    async updateProduct(product, producturl) {
      const {id, name, price, description, area}= product;
      return this.http.fetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, description, producturl,area }),
      });
    }
    

  async getChatProduct(product_id) {
      let query = product_id & `${product_id}` 
      return this.http.fetch(`/products/${query}`, {
        method: 'GET',
      });
    }
  
  }
  