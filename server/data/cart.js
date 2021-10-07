import * as productRepository from './product.js';

let cartproducts = [
//     {
//       createdAt: new Date().toString(),
//       userId: '1',
//       productId: "1",
//   },
//     {
//       createdAt: new Date().toString(),
//       userId: '2',
//       productId: "2",
//     },
//     {
//         createdAt: new Date().toString(),
//         userId: '2',
//         productId: "3",
//       }
  ];
  


export async function create(userId, productId) {
    const cartproduct = {
      createdAt: new Date(),
      userId,
      productId,
    };
    cartproducts = [cartproduct, ...cartproducts];
    
    return cartproducts;
    // getById(product.id)
  }

  
  export async function getAllByUserId(id) {
   const products = await getAllById(id)
   return Promise.all(products.map(async (product) => {
    const cartproduct = await productRepository.getById(product.productId)
        return{cartproduct}
   }))
  }
  
  export async function getAllById(id) {
      console.log('id chdck',id);
    return cartproducts.filter((product) => product.userId === id)
  }
  
  export async function remove(id) {
    cartproducts = cartproducts.filter((product) => product.productId !== id);
  }