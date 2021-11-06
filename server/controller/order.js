import * as OrderRepository from '../data/order.js';


export async function getChat(req, res, next) {

  const chat = await OrderRepository.getChatProduct(req.userId)
  res.status(200).json(chat)
   
}


export async function getbuyOrder(req, res, next) {

  const chat = await OrderRepository.getbuyerChat(req.userId);
  res.status(200).json(chat)
   
}


export async function createOrder(req, res, next) {
  const { productId} = req.body;
  const check = await OrderRepository.getCheckChat(productId, req.userId)
  if(check){
    res.status(201).json(check.id)
  }else{
  const Product = await OrderRepository.create(productId, req.userId);
  
  res.status(201).json(Product);
  }
}

export async function removeOrder(req, res, next) {
  const id = req.params.id;
  const Order = await OrderRepository.getChatProduct(id);
  if (!Order) {
    return res.status(404).json({ message: `Product not found: ${id}` });
  }
  await OrderRepository.remove(id);
  res.sendStatus(204);
}