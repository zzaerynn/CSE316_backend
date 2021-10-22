import React,{ useState} from "react";

const Popup = ({ popupVisible, popup, togglePopup, preventTogglePopup, setPopupState, }) =>  {
    const [tempPopup, setTempPopup]= useState({...popup});

    const onChange = (e) => {
        setTempPopup({ ...tempPopup, [e.target.id]:e.target.value })
    };

    const unsetChange = () => {setTempPopup({ ...popup})};

    return (
        <div className = {popupVisible ? "popup_bg popup_bg_show " : "popup_bg"} id ="popup_bg" onClick ={ () => {unsetChange(); togglePopup();} } >
            <div className = {popupVisible ? "popup popup_show" : "popup"} id ="popup" >

                <form className = "popup_form" >
                    <div className = "popup_top">
                      <h2 className = "logo"> Edit Profile</h2>
                        <span className="material-icons popup_exit btn" id = "close"  onClick ={ () => {unsetChange(); togglePopup();} } >close</span>
                    </div>
                    <div className = "popup_image">
                        <img className = "popup_profileImage" alt = 'hyerin' src={require('./hyerin.jpg').default} />
                        <div className = "btn" id="newImage"> Choose New Image</div>
                        <div className = "btn" id="rmvImage"> Remove Image </div>
                    </div>
    
                    <div className = "popup_info">
                        <div className = "popup_name">
                            <div>Name</div>
                            <input id= "name" className = "input_info" type="text" placeholder="ex. John Doe" value = {tempPopup.name} onChange = {onChange} required/>
                        </div>
                        <div className = "popup_email">
                            <div>Email</div>
                            <input id= "email" className = "input_info" type="text" placeholder="ex. john.doe@stonybrook.edu"  value = {tempPopup.email} onChange = {onChange} required/>
                        </div>
                        <div className = "popup_loca">
                            <div>Location</div>
                            <input id = "location" className = "input_info" type="text" placeholder="ex. Songdo" value = {tempPopup.location} onChange = {onChange} required />
                        </div>
                    </div>
    
                    <div className = "popup_button">
                        <button className="popup_save btn" id = "save" onClick = {(e) => {e.preventDefault(); setPopupState(tempPopup); togglePopup();}}> Save </button>
                        <div className = "popup_logout btn" id = "logout" onClick = {(e) => {e.preventDefault(); unsetChange(); togglePopup(); } } > Logout </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Popup;

