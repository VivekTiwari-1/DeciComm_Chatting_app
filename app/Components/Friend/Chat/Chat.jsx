"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Style from "./Chat.module.css";
import images from "@/assests";
import { convertTime } from "@/Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  sendMessage,
  readMessage,
  friendMsg,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({ name: "", address: "" });

  const router = useRouter();

  // useEffect(() => {
  //   if (router.isReady) return;
  //   console.log(router.query);
  //   setChatData(router.query);
  // }, [router.isReady]);

  useEffect(() => {
    console.log(currentUserName, currentUserAddress);
    setChatData({ name: currentUserName, address: currentUserAddress });
  }, [currentUserAddress]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, []);

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div>
                {el.sender == chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    {/* <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    /> */}
                    <span>
                      {chatData.name}{" "}
                      <small>Time: {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    {/* <Image
                      src={images.accountName}
                      alt=""
                      width={50}
                      height={50}
                    />{" "} */}
                    <span>
                      {userName}{" "}
                      <small>Time: {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msge}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={30} height={30} />
              <input
                type="text"
                placeholder="Type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={30} height={30} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  className={Style.Chat_box_send_img_send}
                  src={images.send}
                  alt="send"
                  width={30}
                  height={30}
                  onClick={() =>
                    sendMessage({ msg: message, address: chatData.address })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
