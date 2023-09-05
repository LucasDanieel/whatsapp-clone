import React, { useEffect } from "react";
import "./index.css";
import ContactComponent from "./Contact-Component";

const Contacts = ({ myContacts, changeContactSelected, myContactsFilter }) => {
  useEffect(() => {
    enterBoxContact();
  }, [myContacts]);

  const enterBoxContact = () => {
    const div = document.querySelectorAll(".box-contact");

    div.forEach((element) => {
      const icon = element.querySelector(".icon");
      const message = element.querySelector(".message");

      element.addEventListener("mouseenter", (e) => {
        icon.classList.add("hover");
        message.classList.add("hover");
      });

      element.addEventListener("mouseleave", (e) => {
        message.classList.remove("hover");
        icon.classList.remove("hover");
      });
    });
  };

  return (
    <div className="contacts-whats-left">
      <div className="box-contacts-overflow scroll">
        {myContactsFilter.length > 0 &&
          myContactsFilter.map((contact, idx) =>
            contact === false ? (
              <div key={idx}>Contato não encontrado</div>
            ) : (
              <ContactComponent
                key={idx}
                contact={contact}
                changeContactSelected={changeContactSelected}
                myContactsFilter={myContactsFilter}
              />
            )
          )}

        {myContacts &&
          myContactsFilter.length === 0 &&
          myContacts.map((contact, idx) => (
            <ContactComponent
              key={idx}
              contact={contact}
              changeContactSelected={changeContactSelected}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(Contacts);
