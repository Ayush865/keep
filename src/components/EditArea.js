import React, { useState } from "react";
import firebase from "../services/firebase";
import { IoIosAdd } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

function EditArea({ title, content, isPinned, id,onEditClose,onShowToastWarn,onShowToastSuccess }) {

  const [note, setNote] = useState({
    title: title,
    content: content,
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

  function closeButton(){
    onEditClose();
  }

  async function submitButton(event) {
    event.preventDefault();
    if(note.title==="")
    {
      
      onShowToastWarn("No title"); 
    }
    else if(note.content==="")
    {
      onShowToastWarn("No content");
    }
    else
    {
      await firebase.firestore().collection('notes').doc(id).update({title:note.title, body:note.content});
      onEditClose();
      onShowToastSuccess("Updated note successfully")
      setNote({title:'', content:''});
    }
  
  }

  return (
    <div className="mt-3 col-lg-12 col-md-12 col-sm-12 mb-3 d-flex justify-content-center form-edit">
      
      <form >
          
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
         
        
        {/* {isExpanded && <button type="button" className="btn-close" aria-label="Close"></button>} */}
        <p>
          <textarea
            value={note.content}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
          ></textarea>
        </p>
        <button onClick={closeButton} className="form-button-cross">
          <IoMdClose size={35} />
        </button>
        <button onClick={submitButton} className="form-button">
          <TiTick size={35} />
        </button>
        
      </form>
    
    </div>
  );
}

export default EditArea;
