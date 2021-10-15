import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Chat from "./chat";

const Order = ({ orderchatService }) => {
  const [chatmode, setChatmode] = useState(false);
  const [chats, setChats] = useState([]);
  const [orderId, setOrderId] = useState(undefined);
  const [open, setOpen] = useState(
    "채팅방 개설이 늦어지고 있습니다 잠시만 기다려주세요"
  );
  const history = useHistory();
  const { id, userId, username } = history.location.state.product;
  const connectId = orderId;
  useEffect(() => {
    orderId &&
      orderchatService.getChat(orderId).then(chats => setChats([...chats]));
    // .catch(onError);

    const stopSync = orderchatService.onSync(
      chat => onCreated(chat),
      connectId
    );
    return () => stopSync();
  }, [orderchatService, orderId]);

  useEffect(() => {}, []);
  const onCreated = chat => {
    setOpen(false);
    setChats(chats => [chat, ...chats]);
  };

  const click = () => {
    if (window.confirm("하숙 신청을 위한 채팅방을 개설하시겠습니까?")) {
      orderchatService
        .postOrder(id)
        .then(orderId => {
          setOrderId(orderId);
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
      {(chatmode && (
        <>
          <Chat
            orderchatService={orderchatService}
            connectId={connectId}
            id={id}
            orderId={orderId}
          />
          {chats.map(chat => {
            return (
              <>
                {(chat.username && (
                  <span>
                    {chat.username} : {chat.chat.text} - {chat.chat.createdAt}
                    <hr />
                  </span>
                )) || (
                  <span>
                    {chat}
                    <hr />
                  </span>
                )}
              </>
            );
          })}

          {chats.length == 0 && open}
        </>
      )) || <button onClick={click}>채팅방 생성하기</button>}
    </>
  );
};

export default Order;
