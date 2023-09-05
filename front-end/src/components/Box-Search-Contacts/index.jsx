import "./index.css";
import React, { useRef, useState } from "react";

const BoxSearchContacts = ({ sortContactByName }) => {
  const [iconShow, setIconShow] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const input = useRef();

  const focusInput = () => {
    input.current.focus();
  };

  const handleChange = (e) => {
    setTextSearch(e.target.value)
    sortContactByName(e.target.value)
  }

  return (
    <div className="search-whats-left">
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
            placeholder="Pesquisar ou começar uma nova conversa"
            value={textSearch}
            onFocus={() => setIconShow(true)}
            onBlur={() => setIconShow(false)}
            onChange={handleChange}
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
                setTextSearch("");
                input.current.focus();
              }}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="icon-filter">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          className="bi bi-filter point"
          viewBox="0 0 16 16"
        >
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
        </svg>
      </div>
    </div>
  );
};


export default React.memo(BoxSearchContacts)