import React, { useState } from "react";
import ToDoItem from "./TodoItem";
import InputArea from "./InputArea";

function App() {
  const [newItem, setItem] = useState([]);

  function onSubmitItem(inputText) {
    setItem((preValue) => {
      return [...preValue, inputText];
    });
  }
  function deleteItem(id) {
    setItem((preValue) => {
      return preValue.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      {/* <div className="form">
        <input type="text" onChange={handleChange} value={inputText} />
        <button onClick={onSubmitItem}>
          <span>Add</span>
        </button>
      </div> */}
      <InputArea onAdd={onSubmitItem} />
      <div>
        <ul>
          {newItem.map((item, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={item}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
