"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Navbar.module.css";
import { ChatAppContext, ChatAppProvider } from "@/Context/ChatAppContext";
import { Model } from "../index";
import images from "@/assests";

const Navbar = () => {
  const menuItems = [
    {
      menu: "HOME",
      link: "/",
    },
    {
      menu: "All Users",
      link: "/AllUsers",
    },
    {
      menu: "CHAT",
      link: "/Chat",
    },
    {
      menu: "SETTING",
      link: "/Upcomming",
    },
    {
      menu: "FAQS",
      link: "/Upcomming",
    },
  ];

  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } =
    useContext(ChatAppContext);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
          <h1>DeciComm.</h1>
        </div>
        <ChatAppProvider>
          <div className={Style.Navbar_box_right}>
            {/* FOR DESKTOP */}
            <div className={Style.Navbar_box_right_menu}>
              {menuItems.map((item, index) => (
                <div
                  onClick={() => setActive(index + 1)}
                  key={index + 1}
                  className={`${Style.Navbar_box_right_menu_item} ${
                    active == index + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link
                    className={Style.Navbar_box_right_menu_item_link}
                    href={item.link}
                  >
                    {item.menu}
                  </Link>
                </div>
              ))}
            </div>
            {/* FOR MOBILE */}
            {open && (
              <div className={Style.mobile_menu}>
                {menuItems.map((item, index) => (
                  <div
                    onClick={() => setActive(index + 1)}
                    key={index + 1}
                    className={`${Style.mobile_menu_item} ${
                      active == index + 1 ? Style.active_btn : ""
                    }`}
                  >
                    <Link
                      className={Style.mobile_menu_item_link}
                      href={item.link}
                    >
                      {item.menu}
                    </Link>
                  </div>
                ))}

                <p className={Style.mobile_menu_btn}>
                  <Image
                    src={images.close}
                    alt="close"
                    width={50}
                    height={50}
                    onClick={() => setOpen(false)}
                  />
                </p>
              </div>
            )}

            {/* CONNECT WALLET */}
            <div className={Style.Navbar_box_right_connect}>
              {account == "" ? (
                <button onClick={() => connectWallet}>
                  {""}
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <button onClick={() => setOpenModel(true)}>
                  {""}
                  <Image
                    src={userName ? images.accountName : images.create2}
                    alt="Account image"
                    width={20}
                    height={20}
                  />
                  {""}
                  <small>{userName || "Create Account"}</small>
                </button>
              )}
            </div>

            <div
              className={Style.Navbar_box_right_open}
              onClick={() => setOpen(true)}
            >
              <Image src={images.open} alt="open" width={30} height={30} />
            </div>
          </div>
        </ChatAppProvider>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="ENJOY YOUR PRIVACY"
            head="CHAT SECURELY BY SIGNING UP!!"
            smallInfo="Enter your Name"
            functionName={createAccount}
            address={account}
          />
        </div>
      )}

      {/* {error == "" ? "" : <Error error={error} />} --> This single line causing an error which took 2 hours of mine to debug it*/}

      {/* Error -> Application error: a client-side exception has occurred (see the browser console for more information). */}
    </div>
  );
};

export default Navbar;
