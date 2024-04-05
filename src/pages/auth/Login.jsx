import React, { useEffect, useState } from "react"
import logo from "../../images/greenBin.png"
import image1 from "../../images/Group.png"
import "../../styles/resident/login.css"
import icons from "../../images/icons.png"
import axiosInstance from "../../Axios";
import Loading from "../../components/Loading"
import { setUser,setToken } from "../../store/reducer/ui/userInformationSlice"
import { useDispatch, useSelector } from "react-redux"

const Login =()=>{
  const userInfo = useSelector(state => state.userInfo.userInfo);
  const token = useSelector(state => state.userInfo.token);

  const dispatch = useDispatch();    
  const [form,setForm]=useState({
    email:"",
    password:"",
  })
  function handelChangeForm(e){
      setForm({...form,[e.target.name] : e.target.value});
  }
  //loading
  const [loading,setLoading]=useState(false);
  //error handel

  const [err,setErr]=useState("");

  const submit=async(e)=>{
      setLoading(true);
      e.preventDefault();
      try{
          const res=await axiosInstance.post('/login',form);
          setLoading(false);
          dispatch(setToken(res.data.token))
          dispatch(setUser(res.data.user));
          console.log(res)
          setCookie('token', res.data.token, 7);
          window.location.href = '/home';
        }catch(err){
          setLoading(false);
          if(err.response.status===401){
              setErr("wordg email or password");
          }else{
              console.log(err)
          }
          console.log(err)
      }
    }
    const getUser =()=>{
      axiosInstance.get("/user",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      })
    }
    const setCookie = (name, value, days) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`;
    };
    

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
            <div className="input">
              <input type="email" name="email" id="" placeholder="Email"  value={form.email} onChange={handelChangeForm} />
            </div>
            <div className="input">
              <input type="text" id="" placeholder="Password"  value={form.password} name="password" onChange={handelChangeForm}/>
            </div>
            <div className="forget">
              <p>Forget Password</p>
            </div>
            <div className="loginBody">
                    <div className="buttonLogin2" onClick={submit}>
                        <h2>Login</h2>
                    </div>
                </div>
                <div className="new" onClick={getUser}>
                  <p>New user <span>Sin Up</span></p>
                </div>
              <div className="or">
                <div className="line"></div>
                <p>OR</p>
                <div className="line"></div>
              </div>
              <div className="icons" style={{marginTop:"-10px"}}>
                    <img src={icons} alt="" />
                </div>
        </div>
        </>
    )
}
export default Login