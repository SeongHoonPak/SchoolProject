import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home from "../components/home/home";

const MyProducts = ({ productService, authService }) => {
  const { username } = useParams();
  const [manner, setManner] = useState(36.5);
  console.log("username??????", username);
  const Click = e => {
    const count = e.target.innerText;
    authService.postUsermanner(username, count).then(re => {
      setManner(re.toPrecision(3));
    });
  };
  useEffect(() => {
    authService.getUser(username).then(re => {
      setManner(re.toPrecision(3));
    });
  }, [username]);
  return (
    <>
      <h1>회원정보 : {username}</h1>
      <h2>별점 - {manner}</h2> <button onClick={Click}>+</button>{" "}
      <button onClick={Click}>-</button>
      <Home
        productService={productService}
        username={username}
        addable={false}
      />
    </>
  );
};

export default MyProducts;
