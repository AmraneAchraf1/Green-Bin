import React from "react"
import logo from "../../images/greenBin.png"
import image1 from "../../images/Group.png"
import icons from "../../images/icons.png"
import "../../styles/resident/login.css"
import { Link } from "react-router-dom"
const Welcome =()=>{
    return (
        <div className="loginPage">
            <div className="head">
                <img src={image1} alt="" className="group"/>
                <div className="logoContainer">
                    <img src={logo} alt="" className="logo" />
                </div>
                <div className="txt">
                    <h1>Welcome !</h1>
                </div>
                <Link className="Link" to="/register">
                    <div className="loginBody">
                        <div className="buttonLogin1">
                            <p>Create Account</p>
                        </div>
                    </div>
                </Link>
                <Link className="Link" to="/login">
                <div className="loginBody">
                    <div className="buttonLogin2">
                            <h2>Login</h2>
                    </div>
                </div>
                </Link>
                <Link className="Link">
                <div className="loginBody">
                    <div className="buttonLogin2">
                            <h2>Collector Login</h2>
                    </div>
                </div>
                </Link>
                <div className="icons">
                    <img src={icons} alt="" />
                </div>
            </div>
           
        </div>
    )
}
export default Welcome;