import React, { useState } from "react";
import firebase from "../services/firebase";
import { IoIosAdd } from "react-icons/io";

function CreateArea({counterId,onShowToastWarn,onShowToastSuccess}) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded(true);
  }

  function submitButton(event) {
    event.preventDefault();
    if(note.title==="")
    {
      onShowToastWarn("No Title");
    }
    else if(note.content==="")
    {
      onShowToastWarn("No content");
    }
    else
    {
      firebase.firestore().collection("notes").add({
      title:note.title,
      tagline:"test",
      body:note.content,
      timeStamp:firebase.firestore.FieldValue.serverTimestamp(), 
      isPinned:false
    })
    onShowToastSuccess("Added to saved notes");
    setNote({title:'', content:''});
    if(counterId){
        firebase.firestore().collection("counter").doc(counterId).update({count:firebase.firestore.FieldValue.increment(1)})
      }
    }
    setExpanded(false);
  }

  return (
    <div className="myForm mt-3">
      <form >
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        ) 
        }
        {/* {isExpanded && <button type="button" className="btn-close" aria-label="Close"></button>} */}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button onClick={submitButton} className="form-button">
          <IoIosAdd size={35} />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
