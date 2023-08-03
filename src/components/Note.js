import React,{useState} from "react";
import { MdDelete} from "react-icons/md";
import {AiFillPushpin} from "react-icons/ai";
import { TbPinnedOff} from "react-icons/tb";
import NotesCard from "./NotesCard";
import EditArea from "./EditArea";


function Note({ title, content, isPinned, onDelete, id, pin, unpin, onEdit,isEditActive,onShowToastWarn }) {
  const [edit, setEdit] = useState(false);

  function onEditHandler(){
    if(!isEditActive){
      setEdit(true);
      onEdit({title, content, id});
    }else{
      onShowToastWarn("Please complete the changes first or click cancel!");
    }
    
  }

  
  return (
    
      <NotesCard title={title} content={content} isPinned={isPinned}
                onDelete={onDelete} id={id} pin={pin} unpin={unpin}
                onEdit={onEditHandler}
                
      />
    
  );
}

export default Note;
