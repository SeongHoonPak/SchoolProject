import React, { useEffect } from "react";

const Cart = ({ cartService }) => {
  useEffect(() => {
    cartService.getProducts().then(pr => {
      console.log("data;;;", pr);
    });
  }, [cartService]);
  return <h1>1gd</h1>;
};
export default Cart;
