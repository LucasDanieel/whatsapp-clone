import "./index.css";
import * as FormaDate from "../../Utils/FormtDate";

export const HeaderRight = ({ isWriting, contactSelected, openContactProfile }) => {
  return (
    <div className="header-right">
      <div className="info-contact point" onClick={openContactProfile}>
        <div className="image-contact-right">
          {contactSelected?.info?.imageUrl ? (
            <img src={contactSelected.info.imageUrl} alt="" />
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
        <div className="name-last-time">
          <span>{contactSelected.info.name}</span>
          {contactSelected.isOnline ? (
            <span className="last-time">{isWriting ? "Digitando..." : "Online"}</span>
          ) : (
            <span className="last-time">
              visto por último hoje às {FormaDate.formatDate(contactSelected.info.lastAccess)}
            </span>
          )}
        </div>
      </div>
      <div className="icon-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          fill="currentColor"
          className="bi bi-search point"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-three-dots-vertical point"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </div>
    </div>
  );
};
