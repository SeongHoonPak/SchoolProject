import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const NewChat = ({ orderchatService, id, orderId }) => {
  const [chat, setChat] = useState("");
  const onSubmit = async event => {
    event.preventDefault();
    orderchatService.postChat(chat, id, orderId).then(created => {
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
    </>
  );
};

export default NewChat;
