import "./index.css";
import React, { useRef, useState } from "react";
import * as Services from "../../Services/HttpMethods";

const NewContactContainer = ({ account, connection, updateContacts, setOpenNewContat }) => {
  const [iconShow, setIconShow] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [newContacts, setNewContacts] = useState([]);
  const input = useRef();
  const setTimeoutID = useRef();

  const handleChange = (value) => {
    clearTimeout(setTimeoutID.current);
    if (value === "" || value[0] === " ") {
      return setAllNull();
    }

    setTextSearch(value);
    setTimeoutID.current = setTimeout(() => {
      Services.get(`contact/new-contacts/${value}/${account.id}`)
        .then((json) => {
          if (json.isSuccess) {
            setNewContacts(json.data);
            if (json.data.length === 0) setNotFound(true);
          }
        })
        .catch((err) => console.error(err));
    }, 300);
  };

  const handleAddContact = (contact) => {
    var contactDTO = { UserIdSent: account.id, UserIdReceived: contact.id };
    Services.post("contact/create-bond", contactDTO).then((json) => {
      if (json.isSuccess) {
        updateContacts(contact);

        connection.invoke("AddNewContact", contact.email, account.id);
        changeToContainerContacts();
      }
    });
  };

  const setAllNull = () => {
    setTextSearch("");
    setNewContacts([]);
    setNotFound(false);
  };

  const focusInput = () => {
    input.current.focus();
  };

  const changeToContainerContacts = () => {
    setAllNull();
    const container = document.querySelector(".new-contact-container");
    container.classList.add("hidden-container");

    setTimeout(() => {
      setOpenNewContat(false);
    }, 210);
  };

  return (
    <div className="new-contact-container">
      <div className="header-new-contact">
        <div className="arrow-span-1">
          <svg
            onClick={changeToContainerContacts}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="1 2 11 11"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span>Nova conversa</span>
        </div>
      </div>
      <div className="search-new-contact">
        <div className="search-icon-input">
          <div className="search-icon point">
            <div className={`search ${!iconShow ? "show" : "hidden"}`}>
              <svg
                onClick={(e) => {
                  setIconShow(true);
                  focusInput();
                }}
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                className=""
                version="1.1"
                x="0px"
                y="0px"
                enableBackground="new 0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"
                ></path>
              </svg>
            </div>
            <div className={`search ${iconShow ? "show" : "hidden"}`}>
              <svg
                onClick={(e) => setIconShow(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="-2 2 13 12"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </div>
          </div>
          <div className="search-input ">
            <input
              ref={input}
              type="text"
              name="search"
              placeholder="Pesquisar contatos"
              value={textSearch}
              onFocus={() => setIconShow(true)}
              onBlur={() => setIconShow(false)}
              onChange={(e) => handleChange(e.target.value)}
              autoComplete="off"
            />
            <div className={`icon-x ${textSearch.length > 0 ? "show" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                fill="currentColor"
                className="bi bi-x-lg point"
                viewBox="0 0 16 16"
                onClick={() => {
                  setAllNull();
                  input.current.focus();
                }}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="box-new-contact-overflow  scroll">
        {newContacts.length > 0 ? (
          newContacts.map((contact, idx) => (
            <div key={idx} className="box-new-contact" onClick={() => handleAddContact(contact)}>
              <div className="image-new-contact">
                {contact.imageUrl ? (
                  <img src={contact.imageUrl} alt="" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                )}
              </div>
              <div className="name-note-contact">
                <div className="messages">
                  <div className="name-contact">
                    <div className="name">
                      <span>{contact.name}</span>
                    </div>
                  </div>
                  <div className="note-contact">
                    <div className="note-message">
                      <span>{contact.note}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : notFound ? (
          <p>Not Found</p>
        ) : (
          <p>Digite o email do contatos...</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(NewContactContainer);
