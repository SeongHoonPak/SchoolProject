import React, { memo, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Products from "../products/products";
import SearchHeader from "../search_header/search_header";

const Home = memo(
  ({
    seletedProduct,
    productService,
    username,
    cartService,
    FileInput,
    product_id,
  }) => {
    const [products, setProducts] = useState([]);
    const history = useHistory();
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
    const nameproduct = username && true;

    const search = useCallback(
      async query => {
        const product = await productService.Search(query);
        product.length > 0 && setProducts(product);
      },
      [productService]
    );

    useEffect(() => {
      product_id
        ? productService
            .getProduct(product_id) // product_id인 상품 가져오기
            .then(product => setProducts([{ ...product, one: true }]))
            .catch(onError)
        : productService
            .getProducts(username) // 모든 상품 가져오기
            .then(product => setProducts([...product]))
            .catch(onError);
    }, [productService]);

    const onError = error => {
      setError(error.toString());
      setTimeout(() => {
        setError("");
      }, 3000);
    };
    const onUsernameClick = product => history.push(`/${product.username}`);

    return (
      <>
        <SearchHeader onSearch={search} />
        {products.map(product => (
          <Products
            productService={productService}
            cartService={cartService}
            FileInput={FileInput}
            key={product.id}
            nameproduct={nameproduct}
            product={product}
            Delete={Delete}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </>
    );
  }
);
export default Home;
