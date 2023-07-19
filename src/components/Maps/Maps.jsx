import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./Maps.module.css";
import markerImg from "../../assets/marker.png";

const Maps = ({ longitude, latitude }) => {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoibmlsZXNoNDQiLCJhIjoiY2xpb2JucnhmMDdtYTNlbnZoc3FjemU1ZiJ9.ggJRNTOToRQRv4i3o2q9Vw"
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 14,
      }}
      style={{ width: 1024, height: 500 }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      <Marker longitude={longitude} latitude={latitude} anchor="bottom">
        <img src={markerImg} className={styles["marker"]} />
      </Marker>
    </Map>
  );
};

export default Maps;
