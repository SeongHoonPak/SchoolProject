import * as userRepository from './auth.js';

let products = [
  {
    id: "Mon Sep",
    productname: "상품1",
    price: "10000",
    createdAt: new Date().toString(),
    description: "1번상품입니다",
    userId: '1',
    producturl: "naver.com",
  },
  {
    id: "Mon Sep2",
    productname: "상품2",
    price: "20000",
    createdAt: new Date().toString(),
    description: "2번상품입니다",
    userId: '2',
    producturl: "google.com",
  },
];

export async function getAll() {
  return Promise.all(
    products.map(async (product) => {
     
      const { username, name, url } = await userRepository.findById(
        product.userId
      );
      return { ...product, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((products) =>
    products.filter((product) => product.username === username)
  );
}

export async function getById(id) {
  const found = products.find((product) => product.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(productname, price,description,producturl,userId) {
  const product = {
    id: new Date().toString(),
    productname,
    price,description,
    createdAt: new Date(),
    userId,
    producturl,
  };
  products = [product, ...products];
  return products;
  // getById(product.id)
}

export async function update(id, name, price, description, producturl) {
  const product = products.find((product) => product.id === id);
  if (product) {
    product.name = name, 
    product.price = price, 
    product.description = description
    product.producturl = producturl
  }
  return getById(product.id);
}

export async function remove(id) {
  products = products.filter((product) => product.id !== id);
}
