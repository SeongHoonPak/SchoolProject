import React from "react";
import { useParams } from "react-router-dom";
import Home from "../components/home/home";

const MyProducts = ({ productService }) => {
  const { username } = useParams();
  console.log("username??????", username);
  return (
    <>
      <h1>회원정보 : {username}</h1>
      <h2>별점 - </h2>
      <Home
        productService={productService}
        username={username}
        addable={false}
      />
    </>
  );
};

export default MyProducts;
