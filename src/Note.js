import React, {useState} from 'react'

const Note = ({note, selectedID, toggleCol1, selectNote}) => {
    const formatDate = (date)=> {
        date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+ 1;
        const day = date.getDate();
        return `${month}/${day}/${year}`;
        // console.log("formatDate performed");
    }
    
    const formatTitle = (text) => {
        const firstLine = text.split("\n")[0];
        if (firstLine === ""){
            return "New note";
        }
        return firstLine;
    }
    // const [noteOpen, setNoteOpen] = useState(false);
    // // 뒤로가기 하면 true
    // // noteList click False



    return(
        <div className={(selectedID === note.id )? "col1_note col1_note_selected" : "col1_note"} 
            index = {note.id} onClick = { () => {selectNote(note.id); toggleCol1();}} >
                {/* index = {note.id} onClick =  {()=>selectNote(note.id)}> */}
            <div className="col1_text"> {formatTitle(note.text)}</div>
            {/* <div className="col1_textNote" id="col1_textNote" > {note.text}</div> */}
            <div className="col1_date" id="col1_date" > {formatDate(note.date)} </div>
        </div>
    ) 

}

export default Note;  