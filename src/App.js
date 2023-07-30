import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useRef } from "react";

import "./styles.css";
import firebase from "./services/firebase";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Count from "./components/Count";
import EditArea from './components/EditArea';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

toast.configure();


function App(props) {
  const [arr, setArr] = useState([]);
  const [editTrue, setEdit] = useState(false);
  const [editOverlay, setEditOverlay] = useState("");
  const [note, setNote] = useState({
    title: "",
    content: "",
    id:""
  });
  const [totalPages, setTotalPages] = useState(0);
  const [counterId, setCounterId] = useState(null);
  const [currPage, setCurrPage ] = useState(0);

    const getData=async()=>{
    firebase.firestore().collection('notes').orderBy('isPinned','desc').onSnapshot((query)=>{
      setArr(
        query.docs.map((items)=>({
        id:items.id,
        title:items.data().title,
        tagline:items.data().tagline,
        body:items.data().body,
        isPinned:items.data().isPinned
      }))
      );
  });


  firebase.firestore().collection('counter').onSnapshot((query)=>{
       query.docs.map((item)=>{
          setCounterId(item.id);
          let count = item.data().count;
          if(count===0)
            setTotalPages(0);
          else
          {
            setTotalPages(count <=6 ? 1 : parseInt(count/6)+1);
          }
        })     
  })

}

const showToastWarn = (data) => {
  toast.warn(data, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined, 
    });      
}

const showToastSuccess = (data) => {
  toast.info(data, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    });      
}

  function onEdit({title, content, id}){
    if(!editTrue){
      let newNote = {title, content, id};
      setNote(newNote);
      setEdit(true);
      setEditOverlay("editOverlay");
    }
  }

  async function unpin(id) {
    await firebase.firestore().collection('notes').doc(id).update({isPinned : false});
    showToastSuccess("Unpinned note");
  }

  async function pin(id) {
    await firebase.firestore().collection('notes').doc(id).update({isPinned : true});
    showToastWarn("Pinned note");
  }

  async function deleteNotes(id) {
    await firebase.firestore().collection('notes').doc(id).delete();
    showToastSuccess("Deleted note");
    if(counterId){
      firebase.firestore().collection("counter").doc(counterId).update({count:firebase.firestore.FieldValue.increment(-1)})
    }
  }

  function onEditCloseHandler(){
    if(editTrue){
      setEdit(false);
      setNote({title:"", content:"", id:""});
      setEditOverlay("");
    }else{
      showToastWarn("Already closed");
    }
    
  }


  const allNotes=arr.map((note, index) => (
     index >=(currPage*6) && index < (currPage*6)+6 ? <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.body}
        isPinned={note.isPinned}
        onDelete={deleteNotes}
        pin={pin}
        unpin={unpin}
        onEdit={onEdit}
        isEditActive={editTrue}
        onShowToastWarn={showToastWarn}
        onShowToastSuccess={showToastSuccess}
      />:<></>
    
  ))

  const incrementPage=(index)=>{
    setCurrPage(index);
  }

   useEffect(()=>{
      getData();
    },
  [])

  return (
    <div className="App">
      <Header />
      <div className="container-fluid align-items-space-between">

        {!editTrue && <CreateArea counterId={counterId} onShowToastWarn={showToastWarn}
        onShowToastSuccess={showToastSuccess}/>}
        <div className="count pt-3">
          <h4>Saved Notes </h4>
        </div>
        <div className="container-fluid">
          <div className="row">

            {editTrue && <EditArea title={note.title} content={note.content}
                  id={note.id} onEditClose={onEditCloseHandler}
                  counterId={counterId}
                  onShowToastWarn={showToastWarn}
                  onShowToastSuccess={showToastSuccess}
                  />}
          </div>
        </div>
        
        <div className={"container-fluid px-2 "+editOverlay}>
          <div className="notes-container row justify-content-center mb-3 py-4">
            {allNotes}
          
          </div>
          <div className=" d-flex justify-content-center mt-5 mb-3 pg-count">
            {
              
              [...Array(totalPages)].map((elementInArray, index) => ( 
                <div className="page mx-2 text-center" onClick={incrementPage.bind(this, index)}>
                  <h5>{index+1}</h5>
                </div>
              ))
            }     
        </div>
        </div>
      </div>
      
    </div>

  );
}

export default App;