import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";


function InitializeMap( { onMapReady } ) {
  const map = useMap();
  useEffect(() => {
    if (onMapReady) {
      onMapReady(map)
    }
  }, [map, onMapReady]);
  return null;
}

export default function MapBackground( { onMapReady } ) {
  return (
    <MapContainer
      center={[59, -27]} // Adjust to your preferred center
      zoom={5}
      zoomControl={false}
      className="map-background"
    >
      {/* Stadia Alidade Smooth Dark Layer */}
      <TileLayer
        url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/time/{tilematrixset}{maxZoom}/{z}/{y}/{x}.jpg"
        attribution='&copy; Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (&copy; <a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
        time=''
        tilematrixset='GoogleMapsCompatible_Level'
        maxZoom='8'
        minZoom='1'
      />
      <InitializeMap onMapReady={onMapReady} />
    </MapContainer>
  );
}
