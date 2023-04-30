// import { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
//
// import 'mapbox-gl/dist/mapbox-gl.css';
//
// function Mapp() {
//     useEffect(() => {
//         mapboxgl.accessToken = 'pk.eyJ1IjoibmFkaGVtMDEiLCJhIjoiY2xoM20zdWJjMXA0aDNkb2dyc3o2ZndzbiJ9.EZfpr0_XI8xpI6bvYL0THA';
//
//         const map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/mapbox/streets-v12',
//             center: [-122.486052, 37.830348],
//             zoom: 14
//         });
//
//         map.on('load', () => {
//             map.addSource('route', {
//                 type: 'geojson',
//                 data: {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: {
//                         type: 'LineString',
//                         coordinates: [
//                             [-122.483696, 37.833818],
//                             [-122.483482, 37.833174],
//                         ]
//                     }
//                 }
//             });
//
//             map.addLayer({
//                 id: 'route',
//                 type: 'line',
//                 source: 'route',
//                 layout: {
//                     'line-join': 'round',
//                     'line-cap': 'round'
//                 },
//                 paint: {
//                     'line-color': '#888',
//                     'line-width': 8
//                 }
//             });
//         });
//
//         return () => map.remove();
//     }, []);
//
//     return (
//         <div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
//             <h2>hi</h2>
//             <div id="map" style={{ height: '100%' }} />
//         </div>
//     );
// }
//
// export default Mapp;

import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function Mapp() {
    const [map, setMap] = useState(null);

    useEffect(() => {
        // Add your Mapbox access token here
        mapboxgl.accessToken = 'pk.eyJ1IjoibmFkaGVtMDEiLCJhIjoiY2xoM20zdWJjMXA0aDNkb2dyc3o2ZndzbiJ9.EZfpr0_XI8xpI6bvYL0THA';

        // Create a new map instance
        const newMap = new mapboxgl.Map({
            container: 'your-div-id', // Specify the id of the div to add the map to
            style: 'mapbox://styles/mapbox/streets-v11', // Set the map style
            center: [10.181667, 36.806389], // Set the initial center of the map
            zoom: 7 // Set the initial zoom level
        });

        newMap.on('load', () => {
            newMap.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [10.181667, 36.806389],
                            [-122.483482, 37.833174],
                        ]
                    }
                }
            });

            newMap.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8
                }
            });
            const newMarker = new mapboxgl.Marker()
                .setLngLat([10.181667, 36.806389])
                .addTo(newMap);
        });

        newMap.addControl(new mapboxgl.FullscreenControl());
        newMap.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );

        // Set the new map as the state
        setMap(newMap);

        // Cleanup function to remove the map when the component unmounts
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);



    const handleZoomIn = () => {
        if (map) {
            const zoom = map.getZoom();
            map.setZoom(zoom + 1);
        }
    };

    const handleZoomOut = () => {
        if (map) {
            const zoom = map.getZoom();
            map.setZoom(zoom - 1);
        }
    };

    return (

        <>
            <div className="buttons" style={{display:"flex", justifyContent:"center"}}>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>



                <div id="your-div-id" style={{
                    width: '500px',
                    height: '400px',
                    borderRadius:"15px",
                    border:"2px solid red"
                }}>
                    {/* Add any other content you want here */}
                </div>
            </div>
        </>
    );
}

export default Mapp;
