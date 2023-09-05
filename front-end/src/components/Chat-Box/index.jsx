import { useEffect, useRef, useState } from "react";
import "./index.css";
import * as FormtDate from "../../Utils/FormtDate";
import * as Services from "../../Services/HttpMethods";
import { DropDownOptions } from "./DropDownOptions";
import MessageResponded from "../Message-Responded";

export const ChatBox = ({
  myId,
  messageContactSelected,
  setMessageContactSelected,
  messageSelected,
  setMessageSelected,
  contactSelected,
  filterMessageDate,
  chatChange,
  refChat,
  loading,
  setLoading,
  setOpenImage,
}) => {
  const isOpen = useRef(true);
  const chatBox = useRef({});
  const [arrowScrollDown, setArrowScrollDown] = useState(false);
  const [bottom, setBottom] = useState(null);
  const [top, setTop] = useState("20px");
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState("5px");

  useEffect(() => {
    isOpen.current = true;

    const getMoreMessage = (dateTime = null) => {
      Services.get(`message/get-all/${myId}/${contactSelected.info.id}?datetime=${dateTime}`)
        .then((json) => {
          if (json.isSuccess) {
            if (json.data.length == 0) {
              messageContactSelected.more = false;
            } else {
              setMessageContactSelected((s) => {
                if (s.email == contactSelected.info.email) {
                  json.data.forEach((m) => {
                    s.messages.push(m);
                  });

                  s = filterMessageDate(s);
                }
                return { ...s };
              });
            }
            setLoading(false);
          }
        })
        .catch((err) => console.error(err));
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatBox.current;

      if (scrollHeight + scrollTop - clientHeight < 250 && isOpen.current && messageContactSelected.more) {
        isOpen.current = false;
        setLoading(true);
        var msg = messageContactSelected;
        setTimeout(() => {
          var date = !msg.messages[msg.messages.length - 1].dayWeek
            ? msg.messages[msg.messages.length - 1].dateTime
            : msg.messages[msg.messages.length - 2].dateTime;
          getMoreMessage(date);
        }, 400);
      }

      setTimeout(() => {
        const scrollTop1 = chatBox.current.scrollTop;

        if (scrollTop1 < 0) {
          setArrowScrollDown(true);
        }
        if (scrollTop1 >= 0) {
          var divScroll = document.querySelector(".scroll-down");
          divScroll !== null && divScroll.classList.add("back");
          setTimeout(() => {
            setArrowScrollDown(false);
          }, 500);
        }
      }, 100);
    };

    chatBox.current.onscroll = handleScroll;

    refChat.current = chatBox.current;
  }, [messageContactSelected, contactSelected]);

  useEffect(() => {
    scrollDown();

    // fetch(messageContactSelected.messages[0].imageUrl)
    //   .then((resp) => resp.blob())
    //   .then((blob) => {
    //     var reader = new FileReader();

    //     reader.onload = (e) => {
    //       var img = new Image();
    //       img.src = reader.result;

    //       img.onload = () => {
    //         console.log(img.naturalHeight);
    //       };
    //     };

    //     reader.readAsDataURL(blob);
    //   });
  }, [chatChange]);

  const scrollDown = () => {
    chatBox.current.scrollTo(0, 0);
  };

  const handleMoreOptions = (e, obj, idx) => {
    let div = document.querySelector(".container-whats-right");
    let divMessage = document.querySelectorAll(".box-message")[idx].querySelector("#wrapper-message");

    var hasImage = obj.imageUrl ? true : false;

    if (obj.userIdReceived == myId) {
      if (hasImage) {
        setRight("-124px");
        setLeft(null);
      } else {
        setRight("5px");
        setLeft("20px");
      }
    } else {
      setLeft(null);
      setRight("5px");
    }
    if (e.clientY + (hasImage ? 300 : 280) > div.clientHeight) {
      setTop(null);
      setBottom("90%");
    } else {
      setBottom(null);
      setTop("20px");
    }

    if (divMessage.classList.contains("click")) {
      divMessage.classList.remove("click");
    } else {
      divMessage.classList.add("click");
    }
  };

  const openImage = (objImg) => {
    setOpenImage(objImg);
    console.log(objImg);
  };

  return (
    <>
      <div className={`container-chat-box ${messageSelected ? "message-selected" : ""}`}>
        <div ref={chatBox} className="chat-box-overflow scroll">
          <div className="space-box-chat"></div>
          {messageContactSelected.messages[0] !== null &&
            messageContactSelected.messages?.map((m, idx) => (
              <div
                key={idx}
                className={`box-message ${m.userIdSent == myId ? "my" : "other"}${m.addArrow ? " add" : ""}`}
              >
                {m.dayWeek ? (
                  <div className="day-week">
                    <span>{m.dayWeek}</span>
                  </div>
                ) : (
                  <div className="message-length">
                    <div className={`message-time ${m.imageUrl !== null ? "image" : ""}`}>
                      <div id="wrapper-message">
                        {m.respondedMessageId && (
                          <MessageResponded
                            myId={myId}
                            m={m}
                            contactSelected={contactSelected}
                            hasImage={m.imageUrl !== null ? true : false}
                          />
                        )}
                        {m.imageUrl === null && (
                          <div className={`options-message msg ${m.respondedMessageId ? "black" : ""}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              fill="currentColor"
                              className="bi bi-chevron-down"
                              viewBox="0 0 16 16"
                              onClick={(e) => handleMoreOptions(e, m, idx)}
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                            <span>
                              <DropDownOptions
                                style={{ bottom, top, left, right }}
                                content={m}
                                setMessageSelected={setMessageSelected}
                              />
                            </span>
                          </div>
                        )}
                        {m.imageUrl !== null && (
                          <div className="wrapper-imagem">
                            <img src={m.imageUrl} alt="" />
                            <div
                              className={`options-message ${m.respondedMessageId ? "image-responded" : ""}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="18"
                                fill="currentColor"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                                onClick={(e) => handleMoreOptions(e, m, idx)}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                              <span>
                                <DropDownOptions
                                  style={{ bottom, top, left, right }}
                                  image
                                  content={m}
                                  setMessageSelected={setMessageSelected}
                                />
                              </span>
                            </div>
                            {m.text === null || (m.text === "" && <div className="bottom-gradient"></div>)}
                          </div>
                        )}
                        {m.text !== null && m.text !== "" && (
                          <div className="message-text">
                            <>
                              <span className="text-message">{m.text}</span>
                              <span className="space"></span>
                            </>
                          </div>
                        )}
                      </div>
                      <div
                        className={`time${
                          m.text === null || (m.text === "" && m.imageUrl !== null) ? " add-color-white" : ""
                        }`}
                      >
                        <span>{FormtDate.formatDate(m.dateTime)}</span>
                        {m.userIdSent == myId && (
                          <div className="icon-status-message">
                            {m.messageStatus == 1 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                fill="currentColor"
                                className="bi bi-check2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                              </svg>
                            )}
                            {m.messageStatus == 2 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                fill="currentColor"
                                className="bi bi-check2-all"
                                viewBox="0 1 16 16"
                              >
                                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                              </svg>
                            )}
                            {m.messageStatus == 3 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                fill="currentColor"
                                className="bi bi-check2-all blue"
                                viewBox="0 1 16 16"
                              >
                                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          <div className="space-box-chat">
            {loading && (
              <div className="wrapper-ring">
                <div className="ring"></div>
              </div>
            )}
          </div>
        </div>
        <span>
          {arrowScrollDown && (
            <div className="scroll-down" onClick={scrollDown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          )}
        </span>
      </div>
      <span>
        {messageSelected && (
          <div className={`container-respond-message ${messageSelected.userIdSent == myId ? "blue" : ""}`}>
            <div className="wrapper-respond-message">
              <div className={`user-message-text ${messageSelected.imageUrl ? "with-img" : ""}`}>
                <div className="respond-user">
                  <span className="respond-user-name">
                    {messageSelected.userIdSent == myId ? "Você" : contactSelected.info.name}
                  </span>
                  <div className="respond-message-text">
                    {messageSelected.imageUrl && (
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
                    )}
                    <span className="respond-user-text">{messageSelected.text || "Foto"}</span>
                  </div>
                </div>
              </div>
              {messageSelected.imageUrl && (
                <div className="respond-message-image">
                  <div
                    className="message-image"
                    style={{ backgroundImage: `url(${messageSelected.imageUrl})` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="respond-message-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x point"
                viewBox="0 0 16 16"
                onClick={() => setMessageSelected()}
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
