import { useEffect, useState } from "react";
import "./index.css";

export const ChatBox = () => {
  const [messages, setMessages] = useState({
    messages: [
      { howSend: "my", messages: "test13" },
      { howSend: "my", messages: "test12" },
      { howSend: "my", messages: "test11" },
      { howSend: "my", messages: "test10" },
      { howSend: "my", messages: "test9" },
      { howSend: "other", messages: "test8" },
      { howSend: "my", messages: "test7" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
      { howSend: "my", messages: "test6" },
      { howSend: "other", messages: "test5" },
      { howSend: "my", messages: "test4" },
      { howSend: "other", messages: "test3" },
      { howSend: "my", messages: "test2" },
      { howSend: "my", messages: "test1" },
    ],
  });

  // useEffect(() => {
  //   const div = document.querySelector(".chat-box-overflow");
  //   div.scrollTo(0, div.scrollHeight);
  // });

  return (
    <div className="container-chat-box">
      <div className="chat-box-overflow scroll">
        <div className="space-box-chat"></div>
        {messages?.messages?.map((m) => (
          <div className={`box-message ${m.howSend}`}>
            <div className="message-length">
              <div className={`message-time ${m.howSend}`}>
                <div className="message">
                  <span>{m.messages}</span>
                </div>
                <div className="time">
                  <span>07:12</span>
                  {m.howSend === "my" && (
                    <div className="icon-status-message">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        fill="currentColor"
                        className="bi bi-check2-all"
                        viewBox="0 1 16 16"
                      >
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="space-box-chat"></div>
      </div>
    </div>
  );
};
