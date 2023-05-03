import React from "react";
import { Marker, useMap } from "react-leaflet";

export default function Markerwhatever(props) {
    const {mark} = props;
    const map = useMap();

    return (
        <div>
            <Marker
                // icon={props.icon}
                position={[33.91907336973602, 35.51552625946782]}
                eventHandlers={{
                    click: (e) => {
                        map.flyTo(e.latlng, 14);
                    },
                }}
            />
        </div>
    );
}
