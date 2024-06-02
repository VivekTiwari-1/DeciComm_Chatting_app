"use client";

import Style from "./alluser.module.css";
import React, { useContext } from "react";

import { UserCard } from "../index";
import { ChatAppContext } from "@/Context/ChatAppContext";

const alluser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);

  return (
    <div className={Style.alluser}>
      <div className={Style.alluser_info}>
        <h1>Find your friends</h1>
        <p></p>
      </div>
      <div className={Style.alluser_data}>
        {userLists.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default alluser;
