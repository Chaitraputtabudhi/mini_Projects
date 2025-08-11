import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import { useState } from "react";

function CreateNotes(props) {
  const [inputText, setInputText] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);
  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(inputText);
    setInputText({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function checkClick() {
    setExpanded(true);
  }
  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            placeholder="Title"
            value={inputText.title}
          />
        )}

        <textarea
          onClick={checkClick}
          name="content"
          onChange={handleChange}
          placeholder="Take a note.."
          value={inputText.content}
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateNotes;
