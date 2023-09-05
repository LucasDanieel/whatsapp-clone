import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAccount } from "../Create";
import { Home } from "../Home";
import { Login } from "../Login";

export const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
