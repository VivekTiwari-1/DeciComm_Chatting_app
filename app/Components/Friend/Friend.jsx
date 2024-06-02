import React, { useState, useContext } from "react";
import Style from "./Friend.module.css";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

import { ChatAppContext } from "@/Context/ChatAppContext";

const Friend = () => {
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    friendMsg,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
  } = useContext(ChatAppContext);

  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            sendMessage={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
