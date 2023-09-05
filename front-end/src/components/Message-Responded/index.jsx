import React from "react";
import "./index.css";

const MessageResponded = ({ myId, m, contactSelected, hasImage }) => {
  return (
    <div
      className={`wrapper-message-responded${m.respondedMessage.userIdSent == myId ? " blue" : ""}${
        hasImage ? " hasImage" : ""
      }`}
    >
      <div className={`message-responded${m.respondedMessage?.imageUrl ? " image" : ""}`}>
        <div className="user-responded">
          <span className="user-name-responded">
            {m.respondedMessage.userIdSent == myId ? "Você" : contactSelected.info.name}
          </span>
          <div className="message-text-responded">
            {m.respondedMessage?.imageUrl && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-camera-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
            )}
            <span className="user-text-responded">{m.respondedMessage?.text || "Foto"}</span>
          </div>
        </div>
      </div>
      {m.respondedMessage?.imageUrl && (
        <div>
          <div
            className="message-image-responded"
            style={{ backgroundImage: `url(${m.respondedMessage?.imageUrl})` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MessageResponded);
