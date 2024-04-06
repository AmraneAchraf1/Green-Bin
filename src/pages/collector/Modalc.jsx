import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../../styles/resident/menu.css"
import Bin from "../../components/Bin";

import axios from "axios";
const Modalc = ({ isModalOpen,onClose}) => {
  const modalRef = useRef(null);
  const [binsINfo,setBinsInfo] = useState([])
useEffect(()=>{
  getBins();
},[])
  const getBins=()=>{
    axios.get(`http://localhost:8000/api/bins`,{headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer 10|z0kukBkQL8pkr8x4UZ5ofLznvuRqm8D9EGa1QsUac7ad2a61",
    }}).then((res)=>{
      setBinsInfo(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    
}
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
 if (isModalOpen !== true) {
   return null;
 }
 return (
   <section className={`modal ${isModalOpen ? 'open' : ''}`} onClick={handleOutsideClick}>
     <article className="modal-content p-lg-4">
       <div className="exit-icon text-end">
            <div className="blign"><div className="lign"></div></div>
            {binsINfo.map((bin, index) => (
              <div key={index}>
                <Bin binsinfo={bin}  />
              </div>
            ))}
       </div>
      
     </article>
   </section>
 );
};

export default Modalc;