import "./index.css";
import { MyContactsContainer } from "../My-Contacts-Container";
import { MyProfileContainer } from "../My-Profile-Container";
import { NewContactContainer } from "../New-Contact-Container";

export const WhatsLeft = () => {
  return (
    <div className="container-whats-left">
      <MyContactsContainer />
      <MyProfileContainer />
      <NewContactContainer />
    </div>
  );
};
