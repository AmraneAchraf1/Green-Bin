import ima1 from "../images/applications.png"
import ima2 from "../images/cloche.png"
import "../styles/resident/header.css"
import Truck from "../components/Truck"
const Header=({noti})=>{

    return (
        <>
        <div className="header">
            <div className="items">
                <div><img src={ima1} width="40px"/></div>
                <div><h2>Home</h2></div>
                <div onClick={noti}><img src={ima2} width="50px"/></div>
            </div>
            <div>
                <Truck />
            </div>
        </div>
        </>
    )
}
export default Header;