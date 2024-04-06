import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../styles/resident/profil.css"
import profil from "../../images/profil.jpg"
import { CiSettings } from "react-icons/ci";
import { MdContactSupport } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { setToken, setUser } from "../../store/reducer/ui/userInformationSlice";
import axiosInstance from "../../Axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

const Profil=()=>{
    const [userInfo,setUserInfo] =useState(null) ;

    // Function to get a cookie value by name
    const getCookie = (name) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
      };
      const token = getCookie('token');
  
   useEffect(()=>{
        getUser();
    },[])
    const getUser =()=>{
        axiosInstance.get("/user",{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then((res)=>{     
        console.log(res)
        setUserInfo(res.data)
        }).catch((err)=>{
        console.log(err);
        })
    }
    const test= () =>{
        console.log(userInfo.name)
    }
    return (
        <>
        {userInfo ?(
        <div className="body">
            <div>
                <Link to="/home" className="back">
                    <IoMdArrowRoundBack className="backIcon"/>
                    <h3>Back</h3>
                </Link>
            </div>
             <div className="profil">
                <div>
                <img src={profil} alt="" className="image" />
                </div>
                <h2>{userInfo.name}</h2>
                <p>@{userInfo.name}</p>
                <div className="link">
                    <Link to="/profile/edit" className="lin">
                        <div className="button">
                            <p>Edit</p>
                        </div>
                    </Link>
                </div>
             </div>
             <div className="ul">
                <div className="li" onClick={test}>
                    <CiSettings className="ic"/>
                    <h4>Setting</h4>
                </div>
                <div className="li">
                    <FaUserFriends  className="ic"/>
                    <h4>Friend</h4>
                </div>
                <div className="li">
                    <FaPeopleGroup className="ic"/>
                    <h4>New Group</h4>
                </div>
                <div className="li">
                    <MdContactSupport  className="ic"/>
                    <h4>Support</h4>
                </div>
             </div>
        </div>):<Loading />}
        </>
    )
}
export default Profil;