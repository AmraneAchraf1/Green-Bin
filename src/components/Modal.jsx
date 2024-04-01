import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../styles/resident/menu.css"
import Bin from "./Bin";
import axiosInstance from "../Axios";
const Modal = ({ isModalOpen,onClose}) => {
  const modalRef = useRef(null);
  const [binsINfo,setBinsInfo] = useState([])
useEffect(()=>{
  getBins();
},[])
  const getBins=()=>{
    axiosInstance.get("/bins").then((res)=>{
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
              <Bin binsinfo={bin} />
            ))}
       </div>
      
     </article>
   </section>
 );
};

export default Modal;