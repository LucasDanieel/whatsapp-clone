import { useRef } from "react";
import "./index.css";

export const Disconnect = () => {
  const disconnect = useRef();

  const closeDisconnect = () => {
    disconnect.current.classList.remove("show-disconnect");
  };

  return (
    <div ref={disconnect} className="disconnect">
      <div className="box-disconnect">
        <div className="message-buttons">
          <div className="alert-message">
            <p>Sair?</p>
            <span>Tem certeza de que deseja se desconectar?</span>
          </div>
          <div className="disconnect-buttons">
            <button id="cancel" onClick={closeDisconnect}>
              Cancelar
            </button>
            <button id="log-out">Desconectar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
