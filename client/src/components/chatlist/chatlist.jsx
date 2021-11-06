import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Chatlist = ({ orderService }) => {
  const [chatlist, setChatList] = useState([]);
  const [seller, setSeller] = useState([]);
  const history = useHistory("");

  const onClick = e => {
    const values = e.target.attributes;
    history.push({
      pathname: `/chat/${values[0].value}`,
      state: { orderId: values[0].value, id: values[1].value, owner: true },
    });
  };

  useEffect(async () => {
    orderService.getOrder().then(result => {
      setChatList([result]);
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
            <>
              <span>상품 이름 - {list.name} -</span>
              <button
                onClick={onClick}
                orderId={list.id}
                productId={list.productId}
              >
                채팅방 - {list.id}
              </button>
              <hr />
            </>
          );
        })}
    </>
  );
};

export default Chatlist;
