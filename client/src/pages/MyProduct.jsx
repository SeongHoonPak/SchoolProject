import React from "react";
import { useParams } from "react-router-dom";
import Home from "../components/home/home";

const MyProducts = ({ productService }) => {
  const { username } = useParams();
  console.log("username??????", username);
  return (
    <>
      <Home
        productService={productService}
        username={username}
        addable={false}
      />
    </>
  );
};

export default MyProducts;
