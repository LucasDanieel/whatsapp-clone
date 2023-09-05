import "./index.css";
import React, { useRef, useState } from "react";
import * as Services from "../../Services/HttpMethods";

const MyProfileContainer = ({ account, setAccount, connection, userEmails, setOpenProfile }) => {
  const inputName = useRef();
  const inputNote = useRef();
  const [disabledName, setDisabledName] = useState(true);
  const [disabledNote, setDisabledNote] = useState(true);
  const [newInfo, setNewInfo] = useState({
    alter: false,
    name: account.name,
    note: account.note,
  });

  const saveChange = () => {
    if (newInfo.alter) {
      Services.put("user/update", { id: account.id, name: newInfo.name, note: newInfo.note })
        .then((json) => {
          if (json.isSuccess) {
            setAccount({ ...account, name: newInfo.name, note: newInfo.note });

            connection.invoke("NewNameOrNote", account.email, newInfo.name, newInfo.note, userEmails);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleChange = (value, field) => {
    if (field === "name") {
      setNewInfo({ ...newInfo, alter: true, name: value });
    } else {
      setNewInfo({ ...newInfo, alter: true, note: value });
    }
  };

  const changeToContainerContacts = () => {
    setDisabledName(true);
    inputName.current.disabled = true;
    setDisabledNote(true);
    inputNote.current.disabled = true;
    const container = document.querySelector(".my-profile-container");
    container.classList.add("hidden-container");

    setTimeout(() => {
      setOpenProfile(false);
    }, 310);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file == null) return;

    const reader = new FormData();
    reader.append(account.id, file, file.name);

    Services.uploadImage("user/update-image", reader)
      .then((json) => {
        if (json.isSuccess) {
          setAccount({ ...account, imageUrl: json.data });

          connection.invoke("NewImageFromContact", account.email, json.data, userEmails);
        }
      })
      .catch((err) => console.log(err));
  };

  const clickInputName = () => {
    setDisabledName((s) => {
      inputName.current.disabled = !s;
      inputName.current.focus();
      !s && saveChange();
      return !s;
    });
  };

  const clickInputNote = () => {
    setDisabledNote((s) => {
      inputNote.current.disabled = !s;
      inputNote.current.focus();
      !s && saveChange();
      return !s;
    });
  };

  const openInputFile = () => {
    const inputFile = document.querySelector("#input-file");
    inputFile.click();
  };

  return (
    <div className="my-profile-container">
      <div className="header-profile">
        <div className="arrow-span">
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
          <span>Perfil</span>
        </div>
      </div>
      <div className="container-scroll scroll">
        <div className="box-photo-profile">
          <div className="photo-profile">
            <div className="photo-profile-midia point">
              <div className="effect-photo">
                <div className="message-icon-photo" onClick={openInputFile}>
                  <div className="over-photo">
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
                    <span>ADICIONAR FOTO DE PERFIL</span>
                    <input
                      id="input-file"
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => handleFile(e)}
                    />
                  </div>
                </div>
                {account.imageUrl ? (
                  <img className="user-image" src={account.imageUrl} alt="" />
                ) : (
                  <svg
                    viewBox="0 0 212 212"
                    height="40"
                    width="40"
                    preserveAspectRatio="xMidYMid meet"
                    className="ln8gz9je ppled2lx"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enableBackground="new 0 0 212 212"
                  >
                    <path
                      fill="#DFE5E7"
                      className="background"
                      d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"
                    ></path>
                    <g>
                      <path
                        fill="#FFFFFF"
                        className="primary"
                        d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"
                      ></path>
                      <path
                        fill="#FFFFFF"
                        className="primary"
                        d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"
                      ></path>
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="animation-slide-down">
          <div className="box-name-note">
            <div className="input-text">
              <span className="default-padding">Seu nome</span>
              <div className="input-profile default-padding">
                <input
                  ref={inputName}
                  type="text"
                  disabled
                  value={newInfo.name}
                  onChange={(e) => handleChange(e.target.value, "name")}
                />
                {disabledName ? (
                  <svg
                    onClick={clickInputName}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill point"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                ) : (
                  <svg
                    onClick={clickInputName}
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="18"
                    fill="currentColor"
                    className="bi bi-check2 point"
                    viewBox="3 0 16 12"
                  >
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="note">
            <div className="box-note default-padding">
              <span>
                Esse não é seu nome de usuário e nem seu PIN. Esse nome será exibido para seus contatos do
                WhatsApp.
              </span>
            </div>
          </div>
          <div className="box-name-note">
            <div className="input-text">
              <span className="default-padding">Recado</span>
              <div className="input-profile default-padding">
                <input
                  ref={inputNote}
                  type="text"
                  disabled
                  value={newInfo.note}
                  onChange={(e) => handleChange(e.target.value, "note")}
                />
                {disabledNote ? (
                  <svg
                    onClick={clickInputNote}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill point"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                ) : (
                  <svg
                    onClick={clickInputNote}
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="18"
                    fill="currentColor"
                    className="bi bi-check2 point"
                    viewBox="3 0 16 12"
                  >
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MyProfileContainer);
