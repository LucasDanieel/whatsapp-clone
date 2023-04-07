import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user_login"));

    if (user !== null) {
      navigate("/home", { state: user });
    }
  }, []);

  const handleSend = () => {
    if (email.length === 0 || password.length === 0) return;

    fetch(`https://localhost:7200/user/${email}/${password}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (json.isSuccess) {
          localStorage.setItem("user_login", JSON.stringify(json.data));
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleKey = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  return (
    <div className="container-login">
      <div className="box-login">
        <div className="title">
          <h3>WhatsApp Clone</h3>
          <span>Faça seu login aqui</span>
        </div>
        <div className="input-login">
          <div className="label-login">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onKeyDown={handleKey}
            />
          </div>
          <div className="label-login">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyDown={handleKey}
            />
          </div>
        </div>
        <div className="create-login">
          <div className="buttons">
            <span>
              Não possui uma conta? <Link to="/create-account">Criar conta</Link>
            </span>
            <button onClick={handleSend}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
