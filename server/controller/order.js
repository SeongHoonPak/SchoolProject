import * as OrderRepository from '../data/order.js';

export async function createOrder(req, res, next) {
    console.log('오더 생성하자');
  const { productId} = req.body;
  
  const Product = await OrderRepository.create(productId, req.userId);
  res.status(201).json(Product);
}