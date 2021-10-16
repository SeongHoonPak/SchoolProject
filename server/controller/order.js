import * as OrderRepository from '../data/order.js';


export async function getChat(req, res, next) {
  const id = req.params.id;
  
  console.log('id chz',id)
  const chat = await OrderRepository.getChatProduct(id);
  console.log('chatch',chat);
  res.status(200).json(chat)
   
}



export async function createOrder(req, res, next) {
    console.log('오더 생성하자');
  const { productId} = req.body;
  
  const Product = await OrderRepository.create(productId, req.userId);
  
  res.status(201).json(Product);
}

export async function removeOrder(req, res, next) {
  console.log('삭제시도');
  const id = req.params.id;
  const Order = await OrderRepository.getChatProduct(id);
  console.log('삭제 오더확인',Order);
  if (!Order) {
    return res.status(404).json({ message: `Product not found: ${id}` });
  }
  await OrderRepository.remove(id);
  res.sendStatus(204);
}