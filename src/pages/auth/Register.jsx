import React, { useEffect, useState } from "react"
import logo from "../../images/greenBin.png"
import image1 from "../../images/Group.png"
import "../../styles/resident/login.css"
import axiosInstance from "../../Axios"
import Loading from "../../components/Loading"
import profil from "../../images/profil.png"
const Register =()=>{
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {
    const getCurrentPosition = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(getCurrentPosition);
  }, []); 
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
    address:"",
    city:"salé rabat",
    latitude:latitude,
    longitude:longitude,
    image:profil,
})
function handelFormChange(e){
    setForm({...form, [e.target.name] : e.target.value});
}
//loading
const [loading,setLoading]=useState(false);

//error handel

const [err,setErr]=useState("");
// handel form submit




async function submit(e){
    e.preventDefault();
    setLoading(true);
    console.log(latitude +" "+ longitude)
    // covert image1 to blob
    const response = await fetch(image1);
    const blob = await response.blob();
    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('address', form.address);
    formData.append('city', form.city);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('image', blob);

    try {
      const response = await axiosInstance.post('/register', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
      }
      );
      console.log('response', response);
      setLoading(false);
      window.location.href = '/login';

    } catch (error) {
      console.error('Error registering:', error);
      setErr(error.response.data.message);
      setLoading(false);
    }



}
    return (
      <>
      {loading && <Loading/>}
        <div className="head">
            <img src={image1} alt="" className="group"/>
            <div className="logoContainer">
              <img src={logo} alt="" className="logo" />
            </div>
            <div className="txt">
              <h1>Welcome !</h1>
            </div>
           <div className="inputs">
                <div className="input">
                    <input type="text" name="name"  placeholder="Name"  value={form.name} onChange={handelFormChange}/>
                </div> 
                <div className="input">
                  <input type="email" name="email"  placeholder="Email" value={form.email} onChange={handelFormChange}/>
                </div>
                <div className="input">
                  <input type="password" name="password"  placeholder="Password" value={form.password} onChange={handelFormChange}/>
                </div> 
                <div className="input">
                <input type="text" name="address" placeholder="Address" value={form.address} onChange={handelFormChange}/>
                </div>
           </div>
            
            <div className="loginBody" style={{marginTop:"10px"}}>
                    <div className="buttonLogin2" onClick={submit}>
                            <h2>Register</h2>
                    </div>
                </div>
                <div className="new">
                  <p> user <span>Login</span></p>
                </div>
             
        </div>
        </>
    )
}
export default Register