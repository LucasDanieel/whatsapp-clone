import { useRef, useState } from "react";
import "./index.css";
import { Clip } from "./Clip";

export const InputChat = ({ handleSendMessage, connection, contactSelected, myEmail, dropFile }) => {
  const [message, setMessage] = useState("");
  const [addClass, setAddClass] = useState(false);
  const clipRef = useRef({});

  const handleSubmit = () => {
    handleSendMessage(message);
    setMessage("");
  };

  const typing = (e) => {
    setMessage(e);

    connection.invoke("Writing", myEmail, contactSelected.info.email);
  };

  const enterInput = (e) => {
    if (message.length != 0 && e.key == "Enter" && !e.shiftKey) handleSubmit();
  };

  const handleClickButton = () => {
    setAddClass((s) => !s);
  };

  return (
    <div className="box-input-chat">
      <div className="icons-left-input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-emoji-laughing point"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
        </svg>
        <div ref={clipRef} className="clip">
          <svg
            onClick={handleClickButton}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-paperclip point"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
          <Clip addClass={addClass} setAddClass={setAddClass} clipRef={clipRef} dropFile={dropFile} />
        </div>
      </div>
      <div className="input-chat-icon">
        <div className="input-chat">
          <input
            name="input-message"
            type="text"
            value={message}
            placeholder="Mensagem"
            onKeyUp={enterInput}
            autoComplete="off"
            onChange={(e) => typing(e.target.value)}
          />
        </div>
        {message.length === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-mic-fill point"
            viewBox="0 0 16 16"
          >
            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill point"
            viewBox="0 0 16 16"
            onClick={handleSubmit}
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        )}
      </div>
    </div>
  );
};
