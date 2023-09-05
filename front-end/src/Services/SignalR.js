import { HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";

var _conexao;
export const initSignalR = (email) => {
  _conexao = new HubConnectionBuilder()
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

  connectingChat(email);

  _conexao.on("ReceivedMsg", (sentFrom, messageDTO) => {
    console.log(sentFrom, messageDTO);
  });

  _conexao.on("Disconnected", () => {
    console.log("Disconnected");
    // if (email == contactSelected.contact.email) {
    //   console.log(myContacts);
    //   setContactSelected((s) => ({ ...s, isOnline: false }));
    // }
  });


  return _conexao;
}; 

const connectingChat = (email) => {
  if (_conexao.state == HubConnectionState.Disconnected) {
    _conexao
      .start()
      .then(() => {
        _conexao.invoke("OnConnection", email);
      })
      .catch(() => {
        setTimeout(() => {
          connectingChat(_conexao);
        }, 3000);
      });
  }
};