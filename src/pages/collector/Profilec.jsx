import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../styles/resident/profil.css"
import profil from "../../images/profil.jpg"
import { CiSettings } from "react-icons/ci";
import { MdContactSupport } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";


import { Button } from "@mui/material";
const Profilc=()=>{
    return (
        <div className="body">
            <div>
                <Link to="/homec" className="back">
                    <IoMdArrowRoundBack className="backIcon"/>
                    <h3>Back</h3>
                </Link>
            </div>
             <div className="profil">
                <div>
                    <img src={profil} alt="" className="image" />
                </div>
                <h2>Mohamed Ali</h2>
                <p>@mohamed_ali</p>
                <div className="link">
                    <Link to="/profile/edit" className="lin">
                        <div className="button">
                            <p>Edit</p>
                        </div>
                    </Link>
                </div>
             </div>
             <div className="ul">
                <div className="li">
                    <CiSettings className="ic"/>
                    <h4>Setting</h4>
                </div>
               
                
                <div className="li">
                    <MdContactSupport  className="ic"/>
                    <h4>Support</h4>
                </div>
             </div>
        </div>
    )
}
export default Profilc;