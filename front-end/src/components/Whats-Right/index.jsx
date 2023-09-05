import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createElement, useEffect, useRef, useState } from "react";
import { NoContent } from "../No-Content";
import "./index.css";
import { HeaderRight } from "../Header-Right";
import { InputChat } from "../Input-Chat";
import { ChatBox } from "../Chat-Box";
import ContactProfile from "../ContactProfile";

export const WhatsRight = ({
  myId,
  connection,
  myEmail,
  setConnection,
  contactSelected,
  messageContactSelected,
  setMessageContactSelected,
  setContactSelected,
  sendMessage,
  userEmails,
  filterMessageDate,
  chatChange,
  closeFileDrop,
  sendImage,
  loading,
  setLoading,
  setOpenImage
}) => {
  useEffect(() => {
    initSignalR();
  }, []);

  const [dragActive, setDragActive] = useState(false);

  const [isWriting, setIsWriting] = useState(false);
  var timeoutId;

  useEffect(() => {
    if (connection) {
      connection.on("IsWriting", (email) => {
        if (contactSelected?.info?.email == email) {
          setIsWriting(true);
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsWriting(false);
          }, 3000);
        }
      });
    }

    document.addEventListener("dragenter", dragEnter, true);
    setDragActive(false);

    handleCloseFileDrop();

    return () => {
      if (connection) {
        connection.off("IsWriting");
      }
      document.removeEventListener("dragenter", dragEnter, true);
    };
  }, [connection, contactSelected]);

  const initSignalR = async () => {
    const _conexao = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_URL}chat-hub`)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.elapsedMilliseconds < 60000) {
            return Math.random() * 10000;
          } else {
            return null;
          }
        },
      })
      .configureLogging(LogLevel.Information)
      .build();

    await _conexao.start();
    _conexao.invoke("OnConnection", myEmail, userEmails);
    setConnection(_conexao);
  };

  const [messageSelected, setMessageSelected] = useState();

  const handleSendMessage = (message) => {
    sendMessage(message, null, null, messageSelected);
    setMessageSelected();
  };

  const overChatBox = useRef({});
  const refChat = useRef({});
  const fileDiv = useRef({});
  // const inputFileDrop = useRef({});
  const inputHidden = useRef({});
  const [filesToSend, setFilesToSend] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [onOffContactProfile, setOnOffContactProfile] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", myEvent);

    function myEvent(e) {
      if (e.key === "Escape" && contactSelected?.info) {
        if (onOffContactProfile) closeContactProfile();
        else if (filesToSend.length > 0) handleCloseFileDrop();
        else {
          setContactSelected([]);
          setMessageContactSelected([]);
        }
      }

      if (e.key === "Enter") {
        handleSendImages();
      }
    }
    return () => {
      window.removeEventListener("keyup", myEvent);
    };
  }, [filesToSend, onOffContactProfile]);

  useEffect(() => {
    handleCloseFileDrop();
  }, [closeFileDrop]);

  const dragEnter = (e) => {
    e.preventDefault();
    if (contactSelected?.info?.id == null) return;

    if (refChat.current.contains(e.target)) {
      setDragActive(true);
    }
    if (!refChat.current.contains(e.target) && !overChatBox.current.contains(e.target)) {
      setDragActive(false);
    }
  };

  const dropFile = (e) => {
    e.preventDefault();

    setValueInput("");
    setDragActive(true);
    var files = e.type === "drop" ? e.dataTransfer.files : e.target.files;

    var names = [];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      names.push(file.name);
      var reader = new FileReader();

      reader.onload = (e) => {
        var data = e.target.result;

        if (file.type.startsWith("image")) {
          setFilesToSend((s) => {
            if (files.length === 1) {
              s.map((x) => (x.isSelect = false));
              appendImage(data);
              return [...s, { isSelect: true, base64: data, imageFile: file, text: "" }];
            } else {
              s.map((x, idx) => {
                if (idx === 0) {
                  x.isSelect = true;
                  appendImage(x.base64);
                }
              });
              return [...s, { isSelect: false, base64: data, imageFile: file, text: "" }];
            }
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const appendImage = (data, idx = false) => {
    if (data?.isSelect) return;

    var img = new Image();
    img.src = data.base64 ? data.base64 : data;

    if (idx !== false) {
      setFilesToSend((s) => {
        s.map((f, index) => {
          if (index == idx) {
            f.isSelect = true;
            setValueInput(f.text);
          } else f.isSelect = false;
        });

        return [...s];
      });
    }

    img.onload = () => {
      var largura = img.naturalWidth / 1.3;
      var altura = img.naturalHeight / 1.3;

      fileDiv.current.style.width = largura + "px";
      fileDiv.current.style.height = altura + "px";

      const canvas = document.createElement("canvas");
      canvas.style.maxWidth = "100%";
      canvas.style.maxHeight = "100%";
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (fileDiv.current.childNodes.length > 0) {
        fileDiv.current.innerHTML = "";
      }

      fileDiv.current.appendChild(canvas);

      const context = canvas.getContext("2d");

      context.drawImage(img, 0, 0);

      // context.translate(canvas.width / 2, canvas.height / 2);

      // context.rotate(Math.PI / 2);

      // context.setTransform(1, 0, 0, 1, 0, 0);
    };
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const handleCloseFileDrop = () => {
    setDragActive(false);
    setFilesToSend([]);
    setValueInput("");
    setMessageSelected();
  };

  const handleSendImages = (e) => {
    filesToSend.map((f, idx) => {
      sendImage(f.text, f.imageFile, messageSelected);
    });
  };

  const handleChangeInput = (e) => {
    var text = e.target.value;
    setValueInput(text);

    setFilesToSend((s) => {
      s.map((f) => {
        if (f.isSelect) f.text = text;
      });

      return [...s];
    });
  };

  const openContactProfile = () => {
    setOnOffContactProfile(true);
    document.querySelector(".group-right").classList.add("decrease");
  };

  const closeContactProfile = () => {
    document.querySelector(".group-right").classList.remove("decrease");
    document.querySelector(".container-contact-profile").classList.add("close");

    setTimeout(() => {
      setOnOffContactProfile(false);
    }, 200);
  };

  return (
    <div className="container-whats-right">
      {contactSelected?.info?.id != null ? (
        <>
          <div className="group-right">
            <HeaderRight
              isWriting={isWriting}
              contactSelected={contactSelected}
              openContactProfile={openContactProfile}
            />
            <div
              ref={overChatBox}
              onDrop={dropFile}
              onDragOver={dragOver}
              className={`drag-active ${dragActive ? "hover" : ""}`}
            >
              <div className="line">
                <span>Arraste arquivo aqui</span>
              </div>
            </div>
            <div
              className={`handle-file-drop ${filesToSend.length > 0 ? "file" : ""}`}
              onDrop={dropFile}
              onDragOver={dragOver}
            >
              <div className="header-drop-file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x point"
                  viewBox="0 0 16 16"
                  onClick={handleCloseFileDrop}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                <div className="icons-edit-image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-emoji-smile"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-fonts"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </div>
              </div>
              <div className="container-file-drop">
                <div ref={fileDiv} className="file-drop no-drag-image"></div>
              </div>
              <div className="input-file-drop">
                <div className="input-file">
                  <div className="input-add-message">
                    <input
                      type="text"
                      placeholder="Mensagem"
                      value={valueInput}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="icon-add-message">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      fill="currentColor"
                      className="bi bi-emoji-smile point"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="files-row-send">
                <div className="files-row">
                  {filesToSend.map((f, idx) => (
                    <div key={idx} className={`box-hold-file ${f.isSelect ? "select" : ""} point`}>
                      <img src={f.base64} alt="" onClick={() => appendImage(f, idx)} />
                    </div>
                  ))}
                  <div className="box-add-more point" onClick={() => inputHidden.current.click()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <input ref={inputHidden} type="file" onChange={dropFile} multiple />
                  </div>
                </div>
                <div className="send-button">
                  <div className="send-button-background point" onClick={handleSendImages}>
                    <span>{filesToSend.length}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-send-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <ChatBox
              myId={myId}
              messageContactSelected={messageContactSelected}
              setMessageContactSelected={setMessageContactSelected}
              messageSelected={messageSelected}
              setMessageSelected={setMessageSelected}
              contactSelected={contactSelected}
              filterMessageDate={filterMessageDate}
              chatChange={chatChange}
              refChat={refChat}
              loading={loading}
              setLoading={setLoading}
              setOpenImage={setOpenImage}
            />
            <InputChat
              handleSendMessage={handleSendMessage}
              contactSelected={contactSelected}
              connection={connection}
              myEmail={myEmail}
              dropFile={dropFile}
            />
          </div>
          {onOffContactProfile && (
            <ContactProfile contact={contactSelected.info} closeContactProfile={closeContactProfile} />
          )}
        </>
      ) : (
        <NoContent />
      )}
    </div>
  );
};
