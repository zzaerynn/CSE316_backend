import './App.css';
import './index.js';
import Note from './Note';
import Col from './Col';
import Popup from './popup';
import React,{  useState} from 'react';
import ReactMarkdown from 'react-markdown'

function App() {

    const [ popup, setPopup] = useState(
        window.localStorage.getItem("popupData")=== null? {
            name : "", email : "", location : "", image : "./hyerin.jpg"
        }: JSON.parse(window.localStorage.getItem("popupData"))
    )

    const setPopupState = (value) =>{
        setPopup(value);
        window.localStorage.setItem("popupData", JSON.stringify(value));
    }

    const preventTogglePopup = (e) =>{
        e.stopPropagation();
    }

    const [popupVisible, setPopupVisible]= useState(false);

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    }

    return (
        <div>
            <Popup popupVisible = {popupVisible} popup = {popup} togglePopup = {togglePopup} setPopupState = {setPopupState} />
            <Col  popup = {popup} togglePopup = {togglePopup} setPopupState = {setPopupState} />
        </div>
    )
}


export default App;
