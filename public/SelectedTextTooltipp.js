import React from "react";

function SelectedTextTooltip(props) {
  const { selectedText, position } = props;

  const style = {
    position: "absolute",
    top: position.y + 20,
    left: position.x,
    backgroundColor: "white",
    border: "1px solid black",
    padding: "10px",
  };




  console.log("in public slelected text",selectedText)
  return (
    <div style={style}>
      <h1>Selected Text</h1>
      <p>{selectedText}</p>
    </div>
  );
}

export default SelectedTextTooltip;