import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Order = ({ orderService }) => {
  const [orderId, setOrderId] = useState(undefined);
  const history = useHistory();
  const { id, username } = history.location.state.product;

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
