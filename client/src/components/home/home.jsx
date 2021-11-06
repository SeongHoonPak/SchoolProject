import React, { memo, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Area from "../Area/area";
import Products from "../products/products";
import SearchHeader from "../search_header/search_header";

const Home = memo(
  ({ productService, username, cartService, FileInput, product_id }) => {
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
        const querys = query.trim();
        const product = querys && (await productService.Search(query));

        product && product.length > 0
          ? setProducts(product)
          : window.location.replace("/")(
              alert(`${query}와 일치하는 상품이 존재하지 않습니다`)
            );
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

    const onChangeArea = e => {
      const { value } = e.target;
      (value == "지역" &&
        productService
          .getProducts() // 모든 상품 가져오기
          .then(product => setProducts([...product]))
          .catch(onError)) ||
        productService
          .getArea(value) // 모든 상품 가져오기
          .then(product => setProducts([...product]))
          .catch(onError);

      // setProducts(products =>
      //   products.filter(product => product.area == value)
      // );
    };
    return (
      <>
        {username ? (
          ""
        ) : (
          <>
            <Area onChange={onChangeArea} />
            <SearchHeader onSearch={search} />
          </>
        )}
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
