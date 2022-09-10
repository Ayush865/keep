import React from "react";
import { MdDelete} from "react-icons/md";
import {AiFillPushpin} from "react-icons/ai";
import { TbPinnedOff} from "react-icons/tb";

function NotesCard({ title, content, isPinned, onDelete, id, pin, unpin, onEdit }) {
  function onEditHandler(e){
    e.preventDefault();
    onEdit();
  }
  
  return (
    <div className="mt-3 col-lg-4 col-md-6 col-sm-7 mb-3 d-flex justify-content-center">
    <div className="note p-3">
      <div className="note-left" onClick={onEditHandler}>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      
      <div className="note-right">
        {isPinned ?<button onClick={() => unpin(id)} className="btn">
                      <TbPinnedOff size={25} />
                    </button> 
                    :
                    <button onClick={() => pin(id)} className="btn">
                      <AiFillPushpin size={25} />
                    </button>

        }
        
        <button onClick={() => onDelete(id)} className="btn">
        <MdDelete size={25} />
       </button>
      </div>
      
    </div>
    </div>
  );
}

export default NotesCard;
