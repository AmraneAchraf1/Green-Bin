import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../styles/resident/menu.css"
import Bin from "./Bin";
import axios from "axios";
const Modal = ({ isModalOpen,onClose}) => {
  const modalRef = useRef(null);
  const [binsINfo,setBinsInfo] = useState([])
useEffect(()=>{
  getBins();
},[])
  const getBins=()=>{
    axios.get('http://192.168.12.17:8000/api/bins') .then(response => {
        // Assuming the response data is an array
        const mockBins=response.data;
        setBinsInfo(mockBins);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });
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