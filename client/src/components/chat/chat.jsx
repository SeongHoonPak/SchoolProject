import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchToken } from "../../context/AuthContext";
import Socket from "../../network/socket";
import ChatService from "../../service/chatservice";

const Chat = ({ httpClient }) => {
  const history = useHistory();
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState("상대방이 접속하지 않았습니다.");
  const chatService = new ChatService(httpClient);
  const { orderId, id } = history.location.state;

  const onCreated = chat => {
    setOpen(false);
    setChats(chats => [chat, ...chats]);
  };
  useEffect(() => {
    const socketClient = new Socket(process.env.REACT_APP_BASE_URL, () =>
      fetchToken()
    );
    const chatServices = new ChatService(httpClient, socketClient);

    chatService.postopenChat(orderId).then();
    chatService.getChat(orderId).then(result => setChats([...result]));

    const stopSync = chatServices.onSync(chat => onCreated(chat), orderId);
    return () => stopSync();
  }, []);

  const onClose = async event => {
    event.preventDefault();
    chatService.deleteChat(orderId).then(created => {
      history.push("/chatlist");
    });
  };
  const onSubmit = async event => {
    event.preventDefault();
    chatService.postChat(chat, id, orderId).then(created => {
      setChat("");
    });
    // .catch(onError);
  };

  const onChange = event => {
    setChat(event.target.value);
  };
  return (
    <>
      <form className="chat-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Edit your chat"
          value={chat}
          required
          autoFocus
          onChange={onChange}
          className="form-input chat-input"
        />
        <button type="submit" className="form-btn">
          Post
        </button>
      </form>
      <button onClick={onClose}>채팅종료하기</button>
      <hr />
      {chats.map(chat => {
        return (
          <>
            {(chat.username && (
              <span>
                {chat.username} : {chat.message} - {chat.createdAt}
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
  );
};

export default Chat;
