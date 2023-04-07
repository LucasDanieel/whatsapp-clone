import "./index.css";

export const HeaderRight = () => {
  return (
    <div className="header-right">
      <div className="info-contact">
        <div className="image-contact-right point">
          <img
            src="https://pps.whatsapp.net/v/t61.24694-24/328232503_908042800494393_6574508409462721257_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdRIkE_ff79-g3UeyDb_lZoT42GL52r3yGCwerersHmQRw&oe=64358963"
            alt=""
          />
        </div>
        <div className="name-last-time point">
          <span>Bruno</span>
          {/* <span className="last-time">visto por último hoje às 13:08</span> */}
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
