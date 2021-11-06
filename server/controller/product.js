import * as ProductRepository from '../data/Product.js';

export async function getProducts(req, res) {
  const username = req.query.username;
  const data = await (username
    ? ProductRepository.getAllByUsername(username)
    : ProductRepository.getAll());
  res.status(200).json(data);
}
export async function getArea(req, res) {
  const username = req.query.username;
  const Product = await ProductRepository.getByArea(req.params.id) 
  res.status(200).json(Product)
}

export async function getProduct(req, res, next) {
  const id = req.params.id;
  const Product = await ProductRepository.getById(id);
  if (Product) {
    res.status(200).json(Product);
  } else {
    res.status(404).json({ message: `Product id(${id}) not found` });
  }
}

export async function getSearch(req, res) {
  const {select} = req.params;
  const data = await ProductRepository.getSelect(select)
  res.status(200).json(data)
}

export async function createProduct(req, res, next) {
  const { name, price, description, producturls, area} = req.body;
  const Product = await ProductRepository.create(name, price,description, producturls, req.userId,area);
  res.status(201).json(Product);
}

export async function updateProduct(req, res, next) {
  
  const id = req.params.id;
  const {name, price, description,producturl,area} = req.body;
  const Product = await ProductRepository.getById(id);
  if (!Product) {
    return res.status(404).json({ message: `Product not found: ${id}` });
  }
  if (Product.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await ProductRepository.update(id, name, price, description, producturl, area);
  res.status(200).json(updated);
}

export async function removeProduct(req, res, next) {
  const id = req.params.id;
  const Product = await ProductRepository.getById(id);
  if (!Product) {
    return res.status(404).json({ message: `Product not found: ${id}` });
  }
  if (Product.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await ProductRepository.remove(id);
  res.sendStatus(204);
}
