import React, { useEffect, useState } from "react"
import logo from "../../images/greenBin.png"
import image1 from "../../images/Group.png"
import "../../styles/resident/login.css"
import axiosInstance from "../../Axios"
import Loading from "../../components/Loading"
const Register =()=>{
  const [updatedLocation, setUpdatedLocation] = useState(null);

  useEffect(() => {
    const getCurrentPosition = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            setUpdatedLocation(userLocation)
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
    latitude:"33.989811",
    longitude:"-3.038240",
    image:image1,
})
// Example usage
const userData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123',
  address: '123 Main St',
  city: 'New York',
  latitude: '40.7128',
  longitude: '-74.0060',
  image: image1 
};
 // Create form data object
  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  formData.append('address', userData.address);
  formData.append('city', userData.city);
  formData.append('latitude', userData.latitude);
  formData.append('longitude', userData.longitude);
  formData.append('image', userData.image);
const test=()=>{
  const formDataObject = {};
  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }
  console.log(formDataObject)
}
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
    try{
      const res=await axiosInstance.post('/register',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        setLoading(false);
        console.log(res)
    }catch(err){
    setLoading(false);

        if(err.response.status===422){
            setErr("Email is already been taken");
        }else{
            setErr("internal server ERR");
        }
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