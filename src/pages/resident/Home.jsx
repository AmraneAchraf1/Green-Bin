import Menu from "../../layout/Menu";
import Header from "../../layout/Header";
import Map from "../../components/Map"
import React, { useEffect, useState } from "react";
import {findNearestPosition,findNearestBinPositions} from "./RoutingService"
import { useDispatch, useSelector } from "react-redux";
// styles
import "../../styles/resident/home.css"
import { resetUserBins } from "../../store/reducer/ui/binSlice";
import { setUserLocation, showLoaction } from "../../store/reducer/ui/userSlise";
import axiosInstance from "../../Axios";
import { setToken, setUser } from "../../store/reducer/ui/userInformationSlice";
import { userSelectors } from "../../store/selectors";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home=()=>{
    const dispatch = useDispatch();    
    const binsData = useSelector(state => state.bins.data);
    const [nearestPosition, setNearestPosition] = useState(null); // Initialize with null
    const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
    const [updatedLocation, setUpdatedLocation] = useState(null);
    const userLocation = useSelector(userSelectors);

    // Function to get a cookie value by name
    const getCookie = (name) => {
      const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
      return cookieValue ? cookieValue.pop() : '';
    };
    const token = getCookie('token');

    //---------------------get the  user --------------------

    useEffect(()=>{
        getUser();
    },[])
    const getUser =()=>{
        axiosInstance.get("/user",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log(res)
          dispatch(setToken(res.data.token))
          dispatch(setUser(res.data));
        }).catch((err)=>{
          console.log(err);
        })
    }

       //---------------------get the  bins --------------------

    useEffect(() => {
      // Function to execute when the component mounts
      const getBins= async ()=>{
        console.log(token)
        axiosInstance.get("/bins",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          // Assuming the response data is an array
          const mockBins=res.data;
          const extractedLatLonArray = mockBins.map(bin => [bin.latitude, bin.longitude]);
          // Dispatch action to set bins data in Redux store
          dispatch(resetUserBins(extractedLatLonArray))
          console.log(extractedLatLonArray)
        }).catch((err)=>{
          console.log(err);
        })
      }
    getBins()
    
   }, [dispatch]); 

 
   //---------------------get the current Postion --------------------
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
    }, 2000); // 5000 milliseconds = 5 seconds

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(getCurrentPosition);
  }, []); 
  useEffect(() => {
    // Dispatch the updated location to the Redux store
    if (updatedLocation) {
      dispatch(setUserLocation(updatedLocation));
      setShouldRenderMarker(true);
    }
  }, [dispatch, updatedLocation]);
   //---------------------found the nearset position --------------------
    const nearset =()=>{
      //findNearestBinPositions(currentPosition,bins)
      const nearestPo = findNearestPosition(userLocation, binsData);
      setNearestPosition(nearestPo)
      console.log(nearestPo)
    }
   //--------------------- the notification --------------------
    const notification=()=>{
      console.log("hello")
      toast("Wow so easy!");
    }
    return (
        <div>
            <Header noti={notification}/>
           <div className="mp">
           {updatedLocation && userLocation  ? (<Map nearsetPosition={nearestPosition}  shouldRenderMarker={shouldRenderMarker} currentP={updatedLocation} />):<Loading />}
            </div>
            <div className="menu"><Menu onNerset={nearset} bins={binsData} token={token}/></div>
            <ToastContainer />
        </div>
    )
}
export default Home;