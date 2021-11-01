import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseDate from "../../util/date";

const Cart = ({ cartService }) => {
  const [cartproduct, setCartProduct] = useState([]);
  let pro = cartproduct.map(product => {
    const path = "/product/" + product.id;
    console.log(path);
    const UrlArray = product.producturl.replace(/\[|]|"/g, "").split(",");
    return (
      <>
        <Link to={path}>
          <p>상품 이름 : {product.name}</p>
          <span className="product-date">{parseDate(product.createdAt)}</span>
          {UrlArray.map(url => {
            return <img key={Math.random()} src={url} />;
          })}
        </Link>
      </>
    );
  });
  useEffect(async () => {
    const product = await cartService.getProducts();
    setCartProduct(product);
  }, [cartService]);
  // return <>{pro}</>;
  console.log(cartproduct);
  return <>{pro}</>;
};
export default Cart;
