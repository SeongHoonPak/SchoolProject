import * as CartRepository from '../data/cart.js';
import * as ProductRepository from '../data/Product.js';

export async function getCarts(req, res, next) {
    const Product = await CartRepository.getAllById(req.userId);
    if (Product) {
      res.status(200).json(Product);
    } else {
      res.status(404).json({ message: `Product id(${req.userId}) not found` });
    }
  }



export async function createCart(req, res, next) {
  const { productId } = req.body;
  const Product = await CartRepository.create(req.userId, productId);
  res.status(201).json(Product);
}

export async function removeCart(req, res, next) {
    const { productId } = req.body;  
    const Product = await ProductRepository.getById(productId);
    if (!Product) {
      return res.status(404).json({ message: `Product not found: ${productId}` });
    }
    await CartRepository.remove(req.userId, productId);
    res.sendStatus(204);
}