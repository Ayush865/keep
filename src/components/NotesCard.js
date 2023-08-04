import React from "react";
import { useState } from "react";
import { MdDelete, MdContentCopy } from "react-icons/md";
// import { TbClipboardCopy} from "react-icons/tb";
import { AiFillPushpin } from "react-icons/ai";
import { TbPinnedOff } from "react-icons/tb";
import { BsCheckCircle } from "react-icons/bs";
import "../styles.css";

function NotesCard({
  title,
  content,
  isPinned,
  onDelete,
  id,
  pin,
  unpin,
  onEdit,
  onShowToastSuccess,
}) {
  const [copied, setCopied] = useState("");
  const handleCopy = (copycontent) => {
    setCopied(copycontent);
    navigator.clipboard.writeText(copycontent);
    onShowToastSuccess("Note Copied");
    setTimeout(() => setCopied(false), 3000);
  };
  function onEditHandler(e) {
    e.preventDefault();
    onEdit();
  }

  return (
    <div className="mynote mt-3 col-lg-4 col-md-6 col-sm-7 mb-3 d-flex justify-content-center ">
      <div className="note p-3">
        <div className="note-left" onClick={onEditHandler}>
          <h1>{title}</h1>
          <p className="scrollable-container">{content}</p>
        </div>

        <div className="note-right">
          {isPinned ? (
            <button onClick={() => unpin(id)} className="btn">
              <TbPinnedOff size={25} />
            </button>
          ) : (
            <button onClick={() => pin(id)} className="btn">
              <AiFillPushpin size={25} />
            </button>
          )}

          <button onClick={() => onDelete(id)} className="btn">
            <MdDelete size={25} />
          </button>
          {/* Copy */}

          <button className="btn" onClick={() => handleCopy(content)}>
            {copied === content ? (
              <BsCheckCircle size={25} />
            ) : (
              <MdContentCopy size={25} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
