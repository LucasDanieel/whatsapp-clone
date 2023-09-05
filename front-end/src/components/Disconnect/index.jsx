import { useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Disconnect = ({ disconnectAccount }) => {
  const navigate = useNavigate();
  const disconnect = useRef();

  const closeDisconnect = () => {
    disconnect.current.classList.remove("show-disconnect");
  };

  const logout = () => {
    disconnectAccount();
    localStorage.removeItem("token");
    navigate("/");
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
            <button id="log-out" onClick={logout}>
              Desconectar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
