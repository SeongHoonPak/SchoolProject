import * as CartRepository from '../data/cart.js';
import * as ProductRepository from '../data/Product.js';

export async function getCarts(req, res, next) {
    console.log('유저아이디 확인좀',req.userId);
    const Product = await CartRepository.getAllByUserId(req.userId);
    console.log('zxcxsasd',Product);
    if (Product) {
      res.status(200).json(Product);
    } else {
      res.status(404).json({ message: `Product id(${req.userId}) not found` });
    }
  }



export async function createCart(req, res, next) {
    console.log('cart 찜 생성하자');
  const { productId } = req.body;
  const Product = await CartRepository.create(req.userId, productId);
  console.log('생성 반응')
  res.status(201).json(Product);
}

export async function removeCart(req, res, next) {
    const { productId } = req.body;  
    const Product = await ProductRepository.getById(productId);
    if (!Product) {
      return res.status(404).json({ message: `Product not found: ${productId}` });
    }
    console.log('삭제합니다');
    await CartRepository.remove(req.userId, productId);
    res.sendStatus(204);
}