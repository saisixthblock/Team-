import React from "react";

const Contact = () => {
  const inputRef = React.createRef();
  const onButtonClick = () => {
    inputRef.current.focus();
  };
  return (
    <>
      <h1>Contact via focus</h1>
      <input ref={inputRef} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};

export default Contact;
