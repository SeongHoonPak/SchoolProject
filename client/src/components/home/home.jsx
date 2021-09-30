import React, { memo, useEffect, useState } from "react";
import Products from "../products/products";

const Home = memo(({ productService, username, FileInput, product_id }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const Delete = productId =>
    productService
      .deleteProduct(productId)
      .then(
        () =>
          setProducts(products =>
            products.filter(product => product.id !== productId)
          ),
        window.location.replace("/")
      )
      .catch(error => setError(error.toString()));

  useEffect(() => {
    product_id
      ? productService
          .getProduct(product_id) // product_id인 상품 가져오기
          .then(product => setProducts([{ ...product, one: true }]))
          .catch(onError)
      : productService
          .getProducts() // 모든 상품 가져오기
          .then(product => setProducts([...product]))
          .catch(onError);
  }, [productService]);

  const onError = error => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {products.map(product => (
        <Products
          productService={productService}
          FileInput={FileInput}
          key={product.id}
          product={product}
          Delete={Delete}
        />
      ))}
    </>
  );
});
export default Home;
