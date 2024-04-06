import React, { useState } from 'react'
import "../styles/resident/menu.css"
import img2 from "../images/Search.png"
import { LuHome } from "react-icons/lu";
import { MdPersonOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import buy from "../data.json"
import Modalc from '../pages/collector/Modalc';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors ,binSelectors} from '../store/selectors';

const Menuc=({onNerset,token})=>{
    const user  = useSelector(state => state.user.data)
    const binsData = useSelector(state => state.bins.data);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(prevState => !prevState);
      isModalOpen ? setIsModalOpen(false): setIsModalOpen(true);
    };
    const openModal = async (content) => {
        setIsModalOpen(true);
        console.log(binsData)

    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
   

    return (
        <>
        <div className='berger'> 
        <div className={`animated-component ${isVisible ? 'show' : ''}`}>
        <section className='mod'>
            <Modalc
                isModalOpen={isModalOpen}
                onClose={closeModal}
              
                />
        </section>  
        </div>
        
        <div className="hero">
            <ul className="list">
                <li ><LuHome className="icon1"/></li>
                <li><img src={img2} alt="" className="search" onClick={() => {/**/openModal(buy);toggleVisibility();onNerset();}} /></li>
                <li><Link to="/profile-c"><MdPersonOutline className="icon"/></Link></li>
            </ul>
        </div>
           
        </div>
        
        </>
    )
}
export default Menuc;