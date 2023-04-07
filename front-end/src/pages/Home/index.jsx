import "./index.css"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WhatsLeft } from "../../components/Whats-Left";
import { WhatsRight } from "../../components/Whats-Right";
import { Disconnect } from "../../components/Disconnect";

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState(location.state);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user_login"));
    if (user === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container-home">
      <div className="box-whats">
        <WhatsLeft />
        <WhatsRight />
      </div>
      <Disconnect />
    </div>
  );
};
