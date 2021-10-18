import React from "react";
import { useParams } from "react-router";
import Home from "../components/home/home";

const ThisProducts = ({ productService, cartService }) => {
  const { id } = useParams();
  console.log("idididid", id);
  return (
    <Home
      productService={productService}
      product_id={id}
      cartService={cartService}
    />
  );
};

export default ThisProducts;
