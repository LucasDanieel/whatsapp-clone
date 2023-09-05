import "./index.css";

export const DropDownOptions = ({ image = false, style, content, setMessageSelected }) => {
  const renspond = () => {
    setMessageSelected(content);
    document.querySelector('input[name="input-message"]').focus();
  };

  return (
    <div className="drop-down-options" style={{ ...style }}>
      <ul>
        <li onClick={renspond}>Responder</li>
        <li>Reagir</li>
        {image && <li>Baixar</li>}
        <li>Encaminhar</li>
        <li>Favoritar</li>
        <li>Apagar</li>
      </ul>
    </div>
  );
};
