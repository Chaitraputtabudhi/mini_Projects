import React, { useState } from "react";
import Login from "./login";
import Form from "./Form";


var isloggedIn = false;

const currentTime = new Date().getHours();

function App() {
  const [headingText, setHeadingText] = useState("Hello");

  const [mouseOver, setMouseOver] = useState(false);

  function handleClick() {
    setHeadingText();
  }
    function handleOver() {
      setMouseOver(true);
    }

    function handleOut() {
    setMouseOver(false);
  }
  function handleChange(e) {
    setHeadingText(e.target.value);
  }

  return (
    <div className="container">
      <h1>hello  {headingText}</h1>
      <input type="text" placeholder="Enter your name" 
      onChange={handleChange} value={headingText}/>
      <button
        style={{
          backgroundColor: mouseOver ? "black" : "white",
        }}
        onClick={handleClick}
        onMouseOver={handleOver}
        onMouseOut={handleOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
