import React,{ useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Note from './Note';

 

 const Col = ({ popup, togglePopup }) => {

    const [colVisible, setColVisible] = useState(true);

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize(){
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [textarea, setTextarea] = useState("");

    const getNewID = (notes) =>{
        // console.log("note:",notes);
        let res = -1;
        for (let note in notes){
            // console.log("noteeach:", note);
            if (notes[note].id > res){
                res = notes[note].id;
            }
        }
        return res === -1 ? 0 : res + 1;
    }

    const [noteState, setNoteState] = useState( localStorage.getItem("noteData") === null 
         ? { notes: [] , selectedID : null, newID : 0} 
         : { notes : JSON.parse(window.localStorage.getItem("noteData")),
            selectedID : null, 
            newID : getNewID(JSON.parse(window.localStorage.getItem("noteData")))
         }
        )
    useEffect(() => { window.localStorage.setItem("noteData", JSON.stringify(noteState.notes)); }, [noteState]);

    const index = (id ) =>{
        let res = -1;
        noteState.notes.forEach((note,i) => {
            if (note.id === id){
                res = i
            }
            return res;
        })
        console.log("index: ",res);
        return res;
    }
    
    // const toggleCol1= () => {
    //     setColVisible(!colVisible);
    // }

    const visibleCol1 = () => {
        console.log("visible");
        console.log(colVisible, width);
        setColVisible(true);
    }

    const invisibleCol1 = () => {
        console.log(colVisible, width);
        setColVisible(false);
    }

    const addNote = () => {
        setNoteState({...noteState,
            notes : noteState.notes.concat({id : noteState.newID, text : "", date : new Date()}),
            selectedID : noteState.newID,
            newID : noteState.newID + 1,
        })
        setTextarea("");
        console.log("addNote performed");
    }
    
    
    const editNote = () => {
        const getNewNote = () => {
            const res = noteState.notes.slice(0);
            res[index(noteState.selectedID)].text = textarea;
            return res;
        }
        setNoteState({
            ...noteState,
            notes:getNewNote(),
        })
    }
    
    const changeNote = (e) =>{
        setTextarea(e.target.value)
    }
    
    const deleteNote = () => {
        if (noteState.selectedID < 0){
            return;
        }
        const nextPossibleNotes = noteState.notes.filter( (note) => note.id < noteState.seledtedID );

        const tempID = 
            (noteState.notes.length <= 1) ? null 
            : (nextPossibleNotes.length === 0 ) ? noteState.notes[0].id : nextPossibleNotes[nextPossibleNotes.length -1].id; 
        
        setTextarea ( (index(tempID) === -1) ? "" : noteState.notes[index(tempID)].text)
        setNoteState ({ ...noteState, notes : noteState.notes.filter((note) => note.id !== noteState.selectedID )})
    }

    const selectNote = (id) => { 
        setNoteState({...noteState, selectedID : id})
        setTextarea( (index(id) !== -1) ? noteState.notes[index(id)].text : "");
    }
    
 return (
    <div className = "col">
        <div className = {/*colVisible ? "col1 col1_show" : */width > 500 ? "col1" : colVisible ? "col1" : "col1 col1_notshow"}>
            <div className = "col1_top">
                <img className = "col1_image" id ="image" alt = 'hyerin' src={require('./hyerin.jpg').default} onClick ={togglePopup}/> 
                <div className = "col1_title"> My notes </div>
                <span className="material-icons col1_deleteBtn btn" id = "delete" onClick = {deleteNote}>
                    delete
                </span>
            </div>
            <div className = "col1_search">
                <span className="material-icons col1_searchBtn btn" id="search">search</span>
                <input className="col1_inputSearch" type="text" placeholder="Search all notes"/>
            </div>
            <div className="col1_noteList" id="noteList" >
                {noteState.notes.slice(0).reverse().map((note) => {
                    return (
                        <Note key = {note.id} note = {note} selectedID = {noteState.selectedID} selectNote = {selectNote} toggleCol1 = {invisibleCol1} />
                    )
                })}
            </div>
        </div>
        <div className = {/*!colVisible ? "col2" : window.innerWidth < 500 ? "col2 col2_notshow" : */width > 500 ? "col2" : colVisible ? "col2 col2_notshow" : "col2"}>
            <div className = "col2_top">
                <span className="material-icons col2_undoBtn" id = "undo" onClick = {visibleCol1}>arrow_back</span>
                <span className="material-icons col2_addBtn" id="add" onClick = {addNote}>note_add</span>
            </div>
            <div className = 'col2_note'>
                <textarea className={(noteState.selectedID !== null ) ? "col2_text col2_text_selected" : "col2_text" } id = "text"
                         value = {textarea} onChange= {changeNote} onBlur = {editNote}/>
                <ReactMarkdown className = "col2_markdown" id = "markdown" children = {textarea}/>
            </div>  
        </div>  
      </div>
    )
} 

export default Col;