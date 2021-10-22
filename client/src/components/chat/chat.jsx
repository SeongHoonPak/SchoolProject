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
  console.log();
  useEffect(() => {
    const socketClient = new Socket(process.env.REACT_APP_BASE_URL, () =>
      fetchToken()
    );
    const chatServices = new ChatService(httpClient, socketClient);

    chatService.postopenChat(orderId).then(r => console.log("rr", r));
    chatService.getChat(orderId).then(result => setChats([...result]));

    // chats => setChats([...chats]
    // .catch(onError);

    const stopSync = chatServices.onSync(
      chat => onCreated(chat),
      // setChats(chats => [chat, ...chats]),
      orderId
    );
    return () => stopSync();
  }, []);

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
  console.log("채팅로그", chats);
  return (
    <>
      {/* {chats.map(chat => console.log(chat))} */}
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
      {chats.map(chat => {
        return (
          <>
            {(chat.username && (
              <span>
                {chat.username} : {chat.message} - {chat.createdAt}
                {/* {chat.chat && {chat.chat.text} - {chat.chat.createdAt} } */}
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
