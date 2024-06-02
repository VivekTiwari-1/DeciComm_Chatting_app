import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";

import { ChatAppABI, ChatAppAddress } from "@/Context/constants";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install metamask!!");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const firstAccount = accounts[0];

    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install metamask!!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];

    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection); // Use the correctly imported Web3Provider
    // const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    //console.log(contract);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(Number(time));

  const realTime =
    newTime.getHours() +
    ":" +
    newTime.getMinutes() +
    ":" +
    newTime.getSeconds() +
    " " +
    " " +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
