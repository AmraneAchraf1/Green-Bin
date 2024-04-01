import React from "react";
import { Link } from "react-router-dom";
import "../../styles/resident/profil.css"
import profil from "../../images/profil.jpg"
const EditProful=()=>{
    return (
<div className="body">
            <div>
                <Link to="/profile" className="cancel">
                    <h3>Cancel</h3>
                </Link>
            </div>
             <div className="profil">
                <div>
                    <img src={profil} alt="" className="image" />
                </div>
                <form>
                   <div className="labInp">
                        <label htmlFor="" className="lab">Name</label>
                        <input type="text" className="inp" value="Mohamed Ali"/>
                   </div>
                   <div className="labInp">
                        <label htmlFor="" className="lab">Username</label>
                        <input type="text" className="inp" value="mohamed_ali"/>
                   </div>
                   <div className="labInp">
                        <label htmlFor="" className="lab">Phone</label>
                        <input type="text" className="inp" value="+212 787 999 009"/>
                   </div>
                   <div className="labInp">
                        <label htmlFor="" className="lab">Email</label>
                        <input type="text" className="inp" value="mohamedAli@gmail.com"/>
                   </div>
                </form>
                <div className="link">
                    <Link to="/profile/edit" className="lin">
                        <div className="button">
                            <p className="p">Save</p>
                        </div>
                    </Link>
                </div>
             </div>
            
        </div>
    )

}
export default EditProful;
