import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchToken } from "../../context/AuthContext";
import Socket from "../../network/socket";
import ChatService from "../../service/chatservice";
import Chat from "../chat/chat";

const Chatlist = ({
  httpClient,
  username,
  orderService,
  id,
  orderId,
  productService,
}) => {
  const [chatlist, setChatList] = useState([]);
  const [seller, setSeller] = useState([]);
  const history = useHistory("");
  console.log("user", username);

  const onClick = e => {
    const values = e.target.attributes;

    history.push({
      pathname: `/chat/${values[0].value}`,
      state: { orderId: values[0].value, id: values[1].value, owner: true },
    });
  };
  console.log("chat list?", chatlist);
  useEffect(async () => {
    const products = await productService.getProducts(username);
    products.map(product => {
      orderService.getOrder(product.id).then(result => {
        setChatList(chatlist => [...chatlist, result]);
      });
    });
    const seller = await orderService.getSellOrder();
    setSeller(seller);
  }, []);
  return (
    <>
      <h1>나의 채팅방</h1>
      {seller &&
        seller.map(list => {
          return (
            <>
              <button
                onClick={onClick}
                orderId={list.id}
                productId={list.productId}
              >
                {list.id}
              </button>
            </>
          );
        })}

      {chatlist[0] &&
        chatlist[0].map(list => {
          return (
            <button
              onClick={onClick}
              orderId={list.id}
              productId={list.productId}
            >
              {list.id}
            </button>
          );
        })}
    </>
  );
};

export default Chatlist;
