"use client";

import React from "react";
import Alluser from "../Components/alluser/alluser";
import { ChatAppProvider } from "@/Context/ChatAppContext";

const page = () => {
  return (
    <>
      <ChatAppProvider>
        <Alluser />
      </ChatAppProvider>
    </>
  );
};

export default page;
