import * as React from 'react';
import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as mapboxgl from 'mapbox-gl';
import Markerwhatever from "./Marker";
import {MapContainer} from "react-leaflet";
function MapContainerr(props) {

    return (
        <div>
            <div className="text-center">
            <h2>product placement:</h2>
        </div>
            <br/>
            <div className="map" style={{display:"flex", justifyContent:"center", justifyItems:"center"}}>

                <div style={{width: "600px", height: "400px", display:"flex", justifyContent:"center"}}>
                    <Map mapLib={maplibregl}
                         style={{
                             borderRadius:"15px",

                         }}
                         initialViewState={{
                             longitude: 10.181667,
                             latitude: 36.806389,
                             zoom: 9
                         }}

                         mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=SmTX7smkO5x4lvPoWvCB"
                    >
                        <NavigationControl position="top-left" />
                        <MapContainer>
                            <Marker
                                longitude={10.181667}
                                latitude={36.806389}
                                color={"#00ffea"}
                            />
                        </MapContainer>
                    </Map>
                </div>
            </div>
        </div>

    );
}

export default MapContainerr;
