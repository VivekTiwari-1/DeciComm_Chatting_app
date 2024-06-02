"use client";

import { ChatAppProvider } from "@/Context/ChatAppContext";
import { Navbar } from "./Components";

const Header = () => {
  return (
    <ChatAppProvider>
      <Navbar />
    </ChatAppProvider>
  );
};

export default Header;
