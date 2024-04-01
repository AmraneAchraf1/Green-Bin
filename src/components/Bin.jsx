import React, { useEffect } from "react";
import bin from "../images/corbeille.png"
import bin2 from "../images/corbeille1.png"
import rout from "../images/gis_route.png"
import "../styles/resident/menu.css"
const Bin = ({binsinfo}) => {
 return (
 <section>
    <div>
        <div className="bin-container">
            <div className="bin-pic">
                <img src={bin} alt="" />
            </div>
            <div className="bin-title">
                <h4>Waste #{binsinfo.id}</h4>
                <p>{binsinfo.address}</p>
            </div>
            <div className="bin-info">
                <div className="bin-time">
                    <img src={rout} alt="" />
                    <p>10 Min</p>
                </div>
                <div className="separ"></div>
                <div className="bin-capasity">
                    <img src={bin2} alt="" />
                    <p>{binsinfo.status}%</p>
                </div>
            </div>

        </div>
    </div>
 </section>
 )
};

export default Bin;