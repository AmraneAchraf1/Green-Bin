import "../styles/resident/truck.css"
import truck from "../images/truk.png"
const Truck=()=>{
    return(
        <>
        <div className="all">
            <div className="truck">
                <div className="hello">
                    <img src={truck} width="48px" height="48px" className="img"/>
                    <div className="title">
                        <h2>TRUCK</h2>
                        <p>More than 1 ton</p>
                    </div>
                </div>
                <div className="time">
                    <p>24/04/2024</p>
                    <p className="bold">9:10 PM</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Truck;