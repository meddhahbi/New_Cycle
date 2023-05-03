import React, {useEffect, useState} from 'react';
import axios from "axios";

const ChatGeoLoc = (props) => {
    const [currLocation, setCurrLocation] = useState({});
    const [currLocationJs, setCurrLocationJs] = useState({});
    const [pos, setPos] = useState({});


    const getLocation = async () => {
        const location = await axios.get("https://ipapi.co/json");
        console.log(location.data)
        setCurrLocation(location.data);
    };

    // const getCityFromLatLng = async (lat, lng) => {
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC3Ywds8f1fEPbEplnXci-n0X4xVwm9S_s`;
    //     try {
    //         const response = await axios.get(url);
    //         // return response.data.results[0].address_components.find((component) => component.types.includes('locality')).long_name;
    //         return response.data.results[0].address_components.find((component) => component.types.includes('locality')).long_name;
    //         // return city;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            // window.location.reload()
            navigator.geolocation.getCurrentPosition(resolve, reject,{timeout:10000});
        });
    };

    const getCityFromPosition = async () => {
        try {
            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            const response = await axios.get(url);
            console.log(response.data)
            setCurrLocationJs(response.data)
            return response.data.address.city;
        } catch (error) {
            console.error(error);
        }
    };

    const getCityFromLatLng = async (lat, lng) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
        try {
            const response = await axios.get(url);
            console.log(response.data)
            return response.data.address.city;

        } catch (error) {
            console.error(error);
        }
    };
    const getGeoLocJs = ()=>{
        const successCallback = (position) => {
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
        };

        const errorCallback = (error) => {
            console.error(error.message);
        };

        const options = {
            enableHighAccuracy: true, // request high accuracy if available
            timeout: 1000, // set a timeout of 5 seconds
            maximumAge: 0 // don't use a cached position
        };

        const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options);


// Stop watching for changes after 30 seconds
//         setTimeout(() => {
            navigator.geolocation.clearWatch(watchId);
        // }, 30000);
    }

    const getLocationJs = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            // console.log(position);
            const { latitude, longitude } = position.coords;
            console.log(position.coords)
            setPos(position.coords)
            setCurrLocationJs({ latitude, longitude });
            await getCityFromLatLng(latitude,longitude).then((city)=>{
                // console.log(city)
            })
        });
    };
    useEffect(() => {
        const options = {
            enableHighAccuracy: true, // request high accuracy if available
            timeout: 1000, // set a timeout of 5 seconds
            maximumAge: 0 // don't use a cached position
        };
        getLocation().then();
        getLocationJs();
        console.log("pos")
        getCityFromPosition().then((data)=>{
            console.log(data)
        })
    }, []);
    return (
        <div className="container">
            <div>
                <h1>Current Location</h1>
                <p>Latitude: {currLocation.latitude}</p>
                <p>Longitude: {currLocation.longitude}</p>
                <p>City: {currLocation.city}</p>

                <h1>Current Location JS</h1>
                <p>Latitude: {currLocationJs.lat}</p>
                <p>pos Latitude: {pos.latitude}</p>
                <p>Longitude: {currLocationJs.lon}</p>
                <p>pos Longitude: {pos.longitude}</p>
                <p>place: {currLocationJs.display_name}</p>
            </div>
        </div>
    );
}

export default ChatGeoLoc;
