import "../Login/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    if (name.length === 0 || email.length === 0 || password.length === 0) return;

    let user = { Name: name, Email: email, Password: password };
    fetch("http://localhost:5200/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        if (json.isSuccess) {
          navigate("/home");

          setName("");
          setEmail("");
          setPassword("");
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
      <div className="box-login create">
        <div className="title">
          <h3>WhatsApp Clone</h3>
          <span>Crie seu conta aqui</span>
        </div>
        <div className="input-login">
          <div className="label-login">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              onKeyDown={handleKey}
            />
          </div>
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
              Já possui uma conta? <Link to="/">Faça login</Link>
            </span>
            <button onClick={handleSend}>Criar conta</button>
          </div>
        </div>
      </div>
    </div>
  );
};
