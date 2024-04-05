import Menu from "../../layout/Menu";
import Header from "../../layout/Header";
import Map from "../../components/Map";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { binSelectors } from "../../store/selectors";
import { prevar } from "./OptPre"; // Import the prevar function from OptPre.js
import axiosInstance from "../../Axios";
import axios from "axios";

const Homec = () => {
  const dispatch = useDispatch();
  const binsData = useSelector(state => state.bins.data);
  const [updatedLocation, setUpdatedLocation] = useState(null);
  const [opt,setOpt] = useState([]);

  useEffect(() => {
    const getBins = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/bins`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer 10|z0kukBkQL8pkr8x4UZ5ofLznvuRqm8D9EGa1QsUac7ad2a61"
          }
        });
        const binsData = res.data;
        console.log(binsData)
        dispatch({ type: "SET_BINS_DATA", payload: binsData });
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    };

    getBins();
  }, [dispatch]);

  useEffect(() => {
    const getCurrentPosition = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            setUpdatedLocation(userLocation);
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
    if (updatedLocation) {
      dispatch({ type: "SET_USER_LOCATION", payload: updatedLocation });
    }
  }, [dispatch, updatedLocation]);

   const optimizeRoute = async () => {
    const { distanceMatrix, timeMatrix, sizeMatrix } = prevar(binsData);
    const parameters = [1, 1, 1, 1, 0.1];
    const numIterations = 100;
    const numRuns = 20;

    try {
      const res = await axios.post(`http://localhost:8000/api/optimize`, {
        distanceMatrix,
        garbageSize: sizeMatrix,
        timeMatrix,
        truckCapacity: 1000,
        parameters,
        numIterations,
        numRuns
      });
      
      const optimizedRoute = res.data;
      setOpt(optimizedRoute);
      console.log("Optimized Route:", optimizedRoute);
    } catch (error) {
      console.error("Error optimizing route:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="mp">
        {binsData != null ? <Map bins={binsData} order={opt}/> : null}
      </div> 
      <div className="menu"><Menu optimizeRoute={optimizeRoute} bins={binsData}/></div>
    </div>
  );
};

export default Homec;
