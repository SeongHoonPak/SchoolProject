import * as ProductRepository from '../data/Product.js';

export async function getProducts(req, res) {
  const username = req.query.username;
  const data = await (username
    ? ProductRepository.getAllByUsername(username)
    : ProductRepository.getAll());
  res.status(200).json(data);
}

export async function getProduct(req, res, next) {
  const id = req.params.id;
  const Product = await ProductRepository.getById(id);
  console.log('getId 체크',Product);
  if (Product) {
    res.status(200).json(Product);
  } else {
    res.status(404).json({ message: `Product id(${id}) not found` });
  }
}

export async function createProduct(req, res, next) {
    console.log('생성하자');
  const { name, price, description, producturls} = req.body;
  
  console.log('이름 업데이트',req.body,'으로')
  const Product = await ProductRepository.create(name, price,description, producturls, req.userId);
  console.log('생성 반응')
  res.status(201).json(Product);
}

export async function updateProduct(req, res, next) {
  
  const id = req.params.id;
  const {name, price, description,producturl} = req.body;
  console.log('확인',producturl)
  const Product = await ProductRepository.getById(id);
  if (!Product) {
    return res.status(404).json({ message: `Product not found: ${id}` });
  }
  if (Product.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await ProductRepository.update(id, name, price, description, producturl);
  res.status(200).json(updated);
}

export async function removeProduct(req, res, next) {
  console.log('삭제시도');
  const id = req.params.id;
  const Product = await ProductRepository.getById(id);
  console.log('삭제 상품확인',Product);
  if (!Product) {
    return res.status(404).json({ message: `Product not found: ${id}` });
  }
  if (Product.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await ProductRepository.remove(id);
  res.sendStatus(204);
}
