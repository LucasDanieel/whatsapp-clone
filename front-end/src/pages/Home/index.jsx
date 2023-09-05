import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WhatsRight } from "../../components/Whats-Right";
import { Disconnect } from "../../components/Disconnect";
import { MyContactsContainer } from "../../components/My-Contacts-Container";
import MyProfileContainer from "../../components/My-Profile-Container";
import NewContactContainer from "../../components/New-Contact-Container";
import * as Services from "../../Services/HttpMethods";
import * as FormatDate from "../../Utils/FormtDate";
import LoadingData from "../../components/Loading-Data";
import OpenImage from "../../components/Open-Image";

export const Home = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState();
  const [contactSelected, setContactSelected] = useState({});
  const [messageContactSelected, setMessageContactSelected] = useState({});
  const [mapMessageContacts, setMapMessageContacts] = useState([]);
  const [myContacts, setMyContacts] = useState([]);
  const [myContactsFilter, setMyContactsFilter] = useState([]);
  const [connection, setConnection] = useState();
  const userEmails = useRef([]);
  const [chatChange, setChatChange] = useState(false);
  const [closeFileDrop, setCloseFileDrop] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validUser();

    document.addEventListener("click", eventClick, true);

    return () => document.removeEventListener("click", eventClick, true);
  }, []);

  const eventClick = (e) => {
    var threeDots = document.querySelector("#three-dots-options");
    var dropBox = document.querySelector(".drop-box");

    if (threeDots === null || dropBox === null) return;

    if (!dropBox?.contains(e.target) && !threeDots?.contains(e.target)) {
      dropBox.classList.remove("show-drop-box");
    }

    var boxOptions = document.querySelector("#wrapper-message.click");

    if (boxOptions && !boxOptions.querySelector(".bi-chevron-down").contains(e.target)) {
      boxOptions.classList.remove("click");
    }
  };

  useEffect(() => {
    if (connection) {
      connection.on("ReceivedMsg", (sentFrom, messageDTO) => {
        if (contactSelected?.info?.email == sentFrom) {
          messageDTO.messageStatus = 3;
          connection.invoke("UpdateMessage", account.email, sentFrom, [messageDTO]);
          return changeInfoMyContacts(messageDTO, sentFrom, false);
        }

        changeInfoMyContacts(messageDTO, sentFrom);
      });

      connection.on("ChangeMessageId", (messageDTO) => {
        updateStatusMessage(null, [messageDTO]);
      });

      connection.on("UpdateThisMsg", (emailUpdate, messageDTO) => {
        updateStatusMessage(emailUpdate, messageDTO);
      });

      connection.on("UpdateContacts", (contactDTO) => {
        updateContacts(contactDTO);
      });

      connection.on("UpdateImageContact", (contactEmail, imageUrl) => {
        setMyContacts((s) => {
          s.map((c) => {
            if (c.email == contactEmail) c.imageUrl = imageUrl;
          });

          return [...s];
        });
      });

      connection.on("UpdateNameOrNote", (contactEmail, name, note) => {
        setMyContacts((s) => {
          s.map((c) => {
            if (c.email == contactEmail) {
              c.name = name;
              c.note = note;
            }
          });

          return [...s];
        });
      });

      connection.on("Disconnected", (email, time) => {
        if (contactSelected?.info?.email == email) {
          setContactSelected((s) => {
            s.isOnline = false;
            s.info.lastAccess = time;
            return { ...s };
          });
        }
        var newArray = myContacts.map((contact) => {
          if (contact?.email == email) {
            contact.lastAccess = time;
          }
          return contact;
        });

        setMyContacts(newArray);
      });

      connection.on("IsConnected", (email) => {
        if (contactSelected?.info?.email == email) {
          setContactSelected((s) => {
            s.isOnline = true;
            return { ...s };
          });
        }
      });

      window.addEventListener(
        "beforeunload",
        (e) => {
          e.preventDefault();
          disconnectAccount();
        },
        true
      );
    }

    return () => {
      if (connection) {
        connection.off("ReceivedMsg");
        connection.off("ChangeMessageId");
        connection.off("UpdateThisMsg");
        connection.off("UpdateContacts");
        connection.off("UpdateImageContact");
        connection.off("UpdateNameOrNote");
        connection.off("Disconnected");
        connection.off("IsConnected");
        connection.off("isOnline");
      }
    };
  }, [connection, contactSelected]);

  const disconnectAccount = () => {
    connection.invoke("OnDisconnected", userEmails.current, account.email);
  };

  const validUser = () => {
    var token = localStorage.getItem("token");
    if (token === null) {
      return navigate("/");
    }

    Services.get(`user/auth`)
      .then((json) => {
        if (json.isSuccess) {
          getContacts(json.data.id);
          return setAccount(json.data);
        }

        localStorage.removeItem("user_login");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => {
          console.log("retried");
          validUser();
        }, 10000);
      });
  };

  const getContacts = (myId) => {
    Services.get(`contact/get-all/${myId}`)
      .then((json) => {
        if (json.isSuccess) {
          var mapContacts = json.data.map((x) => {
            userEmails.current.push(x.email);
            x.lastMessageTime = x.lastMessage?.dateTime;
            return x;
          });

          var mapMessageContacts = mapContacts.map((c) => {
            return {
              email: c.email,
              messages: c.lastMessage !== null ? [c.lastMessage] : [],
              more: true,
            };
          });

          setMapMessageContacts(mapMessageContacts);
          return setMyContacts(sortArray(mapContacts));
        }
      })
      .catch((a) => {
        console.error(a);
        setTimeout(() => {
          getContacts(myId);
        }, 1000);
      });
  };

  const changeContactSelected = (contact) => {
    if (contact.email == contactSelected?.info?.email) return;

    if (contactSelected?.info !== undefined) {
      setMapMessageContacts((s) => {
        s.map((c) => {
          if (c.email === messageContactSelected.email) {
            c = messageContactSelected;
          }
        });

        return [...s];
      });
    }

    var con = mapMessageContacts.filter((c) => {
      if (c.email == contact.email) return c;
    });
    if (con[0].messages.length < 30 && con[0].more) {
      setLoading(true);
      setMessageContactSelected(con[0]);

      connection.on("isOnline", (is) => {
        setContactSelected({
          isOnline: is,
          info: contact,
        });
      });
      connection.invoke("VerifyContactConnection", contact.email);

      var lastMsg = con[0].messages[con[0].messages.length - 1];
      // console.log(lastMsg);

      if (lastMsg !== undefined && lastMsg.dayWeek !== undefined)
        lastMsg = con[0].messages[con[0].messages.length - 2];

      Services.get(
        `message/get-all/${account.id}/${contact.id}?datetime=${
          lastMsg !== undefined ? lastMsg.dateTime : null
        }`
      )
        .then((json) => {
          if (json.isSuccess) {
            setLoading(false);
            if (json.data.length === 0) {
              updateMessage(contact, con[0].messages);
              return setMessageContactSelected(con[0]);
            }

            json.data.forEach((m) => {
              con[0].messages.push(m);
            });
            updateMessage(contact, con[0].messages);
            setMessageContactSelected((s) => {
              s = filterMessageDate(con[0]);
              return { ...s };
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      connection.on("isOnline", (is) => {
        setContactSelected({ isOnline: is, info: contact });
        setMessageContactSelected(filterMessageDate(con[0]));
        updateMessage(contact, con[0].messages);
      });
      connection.invoke("VerifyContactConnection", contact.email);
    }

    var update = true;
    var contactsNew = myContacts.map((contacts) => {
      if (contacts.email == contact.email) {
        if (contacts.countMessage > 0) {
          contacts.countMessage = 0;
        } else {
          update = false;
        }
      }
      return contacts;
    });

    if (update == true) {
      setMyContacts(contactsNew);
    }

    setChatChange((s) => !s);
  };

  const filterMessageDate = (array) => {
    var today = new Date();
    var i = 0;

    while (i < array.messages.length) {
      var msg = array.messages[i];

      if (!msg.dayWeek) {
        var nextMsg = array.messages[i + 1];
        var dateMsg = new Date(msg.dateTime);
        var dateMsgString = dateMsg.toLocaleDateString();
        var dateAfter = new Date(nextMsg && nextMsg.dateTime).toLocaleDateString();

        if (dateMsgString !== dateAfter && dateAfter !== "Invalid Date") {
          var diffEmMilissegundos = Math.abs(today - dateMsg);
          var diffEmDias = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24));

          if (dateMsgString === today.toLocaleDateString()) {
            array.messages.splice(i + 1, 0, {
              dayWeek: "HOJE",
            });
          } else if (diffEmDias === 2) {
            array.messages.splice(i + 1, 0, {
              dayWeek: "ONTEM",
            });
          } else if (diffEmDias < 7) {
            var week = [
              "DOMINGO",
              "SEGUNDA-FEIRA",
              "TERÇA-FEIRA",
              "QUARTA-FEIRA",
              "QUINTA-FEIRA",
              "SEXTA-FEIRA",
              "SABADO",
            ];
            array.messages.splice(i + 1, 0, {
              dayWeek: week[dateMsg.getDay()],
            });
          } else {
            array.messages.splice(i + 1, 0, {
              dayWeek: dateMsgString,
            });
          }
        }
      }
      i++;
    }

    array.messages.map((msg, idx) => {
      var nextMsg = array.messages[idx + 1];

      if (msg.userIdSent !== nextMsg?.userIdSent && !msg.dayWeek) {
        msg.addArrow = true;
      } else {
        delete msg.addArrow;
      }
    });

    return array;
  };

  const sendMessage = (text, imageUrl = null, names = null, respondedMessage = null) => {
    var msg = {
      text: text,
      userIdSent: account.id,
      userIdReceived: contactSelected.info.id,
      dateTime: FormatDate.getDateAndTimeNow(),
      messageStatus: 2,
      imageUrl: imageUrl,
      publicId: names,
      respondedMessageId: respondedMessage?.id,
      respondedMessage: respondedMessage,
    };

    connection.invoke("SendMessage", account.email, contactSelected.info.email, msg, true);
    if (imageUrl === null) {
      changeInfoMyContacts(msg, contactSelected.info.email, false);
    }
  };

  const sendImage = (text, imageFile = null, respondedMessage = null) => {
    var msg = {
      Text: text || null,
      UserIdSent: account.id,
      UserIdReceived: contactSelected.info.id,
      DateTime: FormatDate.getDateAndTimeNow(),
      MessageStatus: 2,
      RespondedMessageId: respondedMessage?.id || null,
      RespondedMessage: respondedMessage,
    };

    var formData = new FormData();
    formData.append("image", imageFile, imageFile.name);
    formData.append("Message", JSON.stringify(msg));

    Services.uploadImage("message/send-image", formData)
      .then((resp) => {
        delete resp.data.addArrow;
        connection.invoke("SendMessage", account.email, contactSelected.info.email, resp.data, false);

        setCloseFileDrop((s) => !s);
        changeInfoMyContacts(resp.data, contactSelected.info.email, false);
      })
      .catch((err) => console.error(err));
  };

  const changeInfoMyContacts = (message, email, addCount = true) => {
    var newContact = myContacts.map((contact) => {
      if (contact?.email == email) {
        contact.lastMessage = message;
        addCount && (contact.countMessage += 1);
        contact.lastMessageTime = message.dateTime;
      }
      return contact;
    });

    setMyContacts(sortArray(newContact));

    if (contactSelected?.info?.email == email) {
      setMessageContactSelected((s) => {
        s.messages.unshift(message);
        s = filterMessageDate(s);
        return { ...s };
      });
    } else {
      setMapMessageContacts((s) => {
        s.map((c) => {
          if (c.email === email) {
            c.messages.unshift(message);
          }
        });

        return [...s];
      });
    }

    setChatChange((s) => !s);
  };

  const updateMessage = (contact, msg) => {
    var updateMsg = [];
    msg.forEach((m) => {
      if (m.messageStatus == 2 && m.userIdSent == contact.id) {
        m.messageStatus = 3;
        updateMsg.push(m);
      }
    });
    if (updateMsg.length > 0) connection.invoke("UpdateMessage", account.email, contact.email, updateMsg);
  };

  const updateStatusMessage = (emailUpdate, msg) => {
    if (emailUpdate == null) {
      setMessageContactSelected((s) => {
        s.messages.map((m) => {
          msg.map((m1) => {
            if ((m1.dateTime == m.dateTime && m1.text == m.text) || m1.id == m.id) {
              m.messageStatus = m1.messageStatus;
              m.id = m1.id;
            }
          });
        });
        return { ...s };
      });
    } else {
      var newArray = mapMessageContacts.map((c) => {
        if (c.email == emailUpdate) {
          msg.map((m1) => {
            c.messages.map((m2) => {
              if ((m1.dateTime == m2.dateTime && m1.text == m2.text) || m1.id == m2.id) {
                m2.messageStatus = m1.messageStatus;
                m2.id = m1.id;
              }
            });
          });
        }

        return c;
      });
      setMapMessageContacts(newArray);
    }
  };

  const updateContacts = (contact) => {
    setMyContacts((s) => {
      contact.countMessage = 0;
      contact.lastMessage = null;
      contact.lastMessageTime = undefined;
      s.unshift(contact);
      return [...s];
    });

    setMapMessageContacts((s) => {
      s.push({ email: contact.email, messages: [], more: true });
      return [...s];
    });

    userEmails.current.push(contact.email);
  };

  const sortArray = (array) => {
    return array.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
  };

  const sortContactByName = (text) => {
    if (text.length > 0) {
      var newArray = myContacts.filter((c) => {
        if (c.name.indexOf(text) > -1) return c;
      });

      if (newArray.length === 0) {
        setMyContactsFilter([false]);
      } else {
        setMyContactsFilter(newArray);
      }
    } else {
      setMyContactsFilter([]);
    }
  };

  const [openProfile, setOpenProfile] = useState(false);
  const [openNewContat, setOpenNewContat] = useState(false);
  const [openImage, setOpenImage] = useState({});

  return (
    <>
      {account && myContacts ? (
        <div className="container-home">
          <div className="box-whats">
            <div className="container-whats-left">
              <MyContactsContainer
                account={account}
                myContacts={myContacts}
                changeContactSelected={changeContactSelected}
                sortContactByName={sortContactByName}
                myContactsFilter={myContactsFilter}
                setOpenProfile={setOpenProfile}
                setOpenNewContat={setOpenNewContat}
              />
              {openProfile && (
                <MyProfileContainer
                  account={account}
                  setAccount={setAccount}
                  connection={connection}
                  userEmails={userEmails.current}
                  setOpenProfile={setOpenProfile}
                />
              )}
              {openNewContat && (
                <NewContactContainer
                  account={account}
                  connection={connection}
                  updateContacts={updateContacts}
                  setOpenNewContat={setOpenNewContat}
                />
              )}
            </div>
            <WhatsRight
              myId={account.id}
              myEmail={account.email}
              setConnection={setConnection}
              contactSelected={contactSelected}
              setContactSelected={setContactSelected}
              messageContactSelected={messageContactSelected}
              setMessageContactSelected={setMessageContactSelected}
              sendMessage={sendMessage}
              connection={connection}
              userEmails={userEmails.current}
              filterMessageDate={filterMessageDate}
              chatChange={chatChange}
              closeFileDrop={closeFileDrop}
              sendImage={sendImage}
              loading={loading}
              setLoading={setLoading}
              setOpenImage={setOpenImage}
            />
          </div>
          <Disconnect disconnectAccount={disconnectAccount} />
          <span>
            {openImage.imageUrl && <OpenImage openImage={openImage} contactSelected={contactSelected} />}
          </span>
        </div>
      ) : (
        <LoadingData />
      )}
    </>
  );
};
