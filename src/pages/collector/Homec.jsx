import Menuc from "../../layout/Menuc";
import Header from "../../layout/Header";
import Mapc from "./Mapc";
import React, { useEffect, useState } from "react";
import {findNearestPosition,findNearestBinPositions} from "../resident/RoutingService"

import { useDispatch, useSelector } from "react-redux";
import { userSelectors ,binSelectors} from "../../store/selectors";
// styles
import "../../styles/resident/home.css"
import { resetUserBins } from "../../store/reducer/ui/binSlice";
import { setUserLocation, showLoaction } from "../../store/reducer/ui/userSlise";
import axios from "axios";
const Homec=()=>{
    const dispatch = useDispatch();    
    const binsData = useSelector(state => state.bins.data);
    const user = useSelector(userSelectors)
    const [nearestPosition, setNearestPosition] = useState(null); // Initialize with null
    const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
    const [updatedLocation, setUpdatedLocation] = useState(null);

    //---------------------get the Bins Postion -------------------

    useEffect(() => {
      // Function to execute when the component mounts
      const getBins= async ()=>{
        axios.get(`http://localhost:8000/api/bins`,{headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer 12|2stEoziOCwxtXxQkFjTlJXxdmzHiLyCDs45yukaNd7d70344",
        }}).then((res)=>{
          // Assuming the response data is an array
          const mockBins=res.data;
          const extractedLatLonArray = mockBins.map(bin => [bin.latitude, bin.longitude]);
          //console.log(extractedLatLonArray)
          // Dispatch action to set bins data in Redux store
          dispatch(resetUserBins(extractedLatLonArray))
          console.log(extractedLatLonArray)
        }).catch((err)=>{
          console.log(err);
        })
      }
    getBins()
    
    console.log(user[0])
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
    }, 5000); // 5000 milliseconds = 5 seconds

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

   
    const nearset =()=>{
      //findNearestBinPositions(currentPosition,bins)
      const nearestPo = findNearestPosition(user, binsData);
      setNearestPosition(nearestPo)
      console.log(nearestPo)
    }
   

    return (
        <div>
            <Header />
            <div className="mp">
                {user != null ? <Mapc nearsetPosition={nearestPosition}  shouldRenderMarker={shouldRenderMarker} />:<></>}
            </div>
            <div className="menu"><Menuc onNerset={nearset} bins={binsData}/></div>
        </div>
    )
}
export default Homec;