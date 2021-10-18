import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import OrderService from "../../service/orderservice";
import Chat from "../chat/chat";

const Order = ({ orderService, httpClient }) => {
  const [chatmode, setChatmode] = useState(false);
  const [orderId, setOrderId] = useState(undefined);
  const history = useHistory();
  const { id, userId, username } = history.location.state.product;

  useEffect(() => {}, []);

  const click = () => {
    if (window.confirm("하숙 신청을 위한 채팅방을 개설하시겠습니까?")) {
      orderService
        .postOrder(id)
        .then(orderId => {
          setOrderId(orderId);
          history.push({
            pathname: `/chat/${orderId}`,
            state: { orderId, id },
          });
          setChatmode(true);
        })
        .catch(e => {
          console.log("ee", e);
        });
    }
  };

  return (
    <>
      <h1>하숙집 주인 정보 , {username}</h1>
      <button onClick={click}>채팅방 생성하기</button>
    </>
  );
};

export default Order;
