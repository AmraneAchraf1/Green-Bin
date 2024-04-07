import React ,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../../styles/resident/profil.css"
import profil from "../../images/profil.jpg"
import axiosInstance from "../../Axios";
import Loading from "../../components/Loading";
const EditProful=()=>{
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
    return (
<div className="body">
    {userInfo ?(<>
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
                        <input type="text" className="inp" name="name" value={userInfo.name}/>
                   </div>
                   <div className="labInp">
                        <label htmlFor="" className="lab">adress</label>
                        <input type="text" className="inp" value={userInfo.address}/>
                   </div>
                   <div className="labInp">
                        <label htmlFor="" className="lab">City</label>
                        <input type="text" className="inp" value={userInfo.city}/>
                   </div>
                   <div className="labInp">
                        <label htmlFor="" className="lab">Email</label>
                        <input type="text" className="inp" value={userInfo.email} onlyread/>
                   </div>
                </form>
                <div className="link">
                    <Link to="/profile/edit" className="lin">
                        <div className="button">
                            <p className="p">Save</p>
                        </div>
                    </Link>
                </div>
             </div></>):<Loading />}
        </div>
    )

}
export default EditProful;
