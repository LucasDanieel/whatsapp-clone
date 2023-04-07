import { useState } from "react";
import { NoContent } from "../No-Content";
import "./index.css";
import { HeaderRight } from "../Header-Right";
import { InputChat } from "../Input-Chat";
import { ChatBox } from "../Chat-Box";

export const WhatsRight = () => {
  const [messages, setMessages] = useState({
    // messages: [{ text: "oi" }],
  });

  return (
    <div className="container-whats-right">
      {messages?.messages?.length > 0 ? (
        <div className="group-right">
          <HeaderRight />
          <ChatBox />
          <InputChat />
        </div>
      ) : (
        <NoContent />
      )}
    </div>
  );
};
