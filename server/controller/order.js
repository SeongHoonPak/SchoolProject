import * as OrderRepository from '../data/order.js';


export async function getChat(req, res, next) {

  const chat = await OrderRepository.getChatProduct(req.userId)
  console.log('chatch',chat);
  res.status(200).json(chat)
   
}

export async function getbuyOrder(req, res, next) {

  const chat = await OrderRepository.getbuyerChat(req.userId);
  console.log('getbuyOrder',chat);
  res.status(200).json(chat)
   
}
export async function createOrder(req, res, next) {
  console.log('order check?')
  const { productId} = req.body;
  const check = await OrderRepository.getCheckChat(productId, req.userId)
  console.log(check,'체크확인')
  if(check){
    res.status(201).json(check.id)
  }else{
  const Product = await OrderRepository.create(productId, req.userId);
  
  res.status(201).json(Product);
  }
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