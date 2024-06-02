"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendsLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);

      const friendLists = await contract.getMyFriendList();
      setFriendsLists(friendLists);

      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      //setError("Please connect your Wallet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log("Currently you have no message.");
    }
  };

  //CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Name and AccountAdddress cannot be empty!!");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setTimeout(function () {
        setLoading(true);
      }, 5000);
      //await getCreatedUser.wait(2); //Getting error here
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //ADD FRIENDS
  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress) return setError("Please provide data");

      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      //await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log("Error in adding friend!!");
    }
  };

  //SEND MESSAGE
  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("Type your message");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      //await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //READ INFO
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        currentUserName,
        currentUserAddress,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
