import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function onSubmitChange(event) {
    setSubmitted(name);
    event.preventDefault();
  }

  return (
    <div className="container">
      <form onSubmit={onSubmitChange}>
        <h1>Hello {submitted}</h1>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
