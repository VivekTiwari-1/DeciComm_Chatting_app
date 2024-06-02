"use client";

import React from "react";
import { Filter, Friend } from "../Components";
import { ChatAppProvider } from "@/Context/ChatAppContext";

const page = () => {
  return (
    <>
      <ChatAppProvider>
        <Filter />
        <Friend />
      </ChatAppProvider>
    </>
  );
};

export default page;
