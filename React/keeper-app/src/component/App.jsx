import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";
import CreateNotes from "./CreateNotes";
import { useState } from "react";

function App() {
  const [newNote, setNote] = useState([]);

  function addNote(inputText) {
    setNote((prevValue) => {
      return [...prevValue, inputText];
    });
  }

  function deleteNote(id) {
    setNote((prevValue) => {
      return prevValue.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateNotes onAdd={addNote} />
      {/*notes.map((note) => (
        <Note key={note.key} title={note.title} content={note.content} />
      )) */}

      {newNote.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
