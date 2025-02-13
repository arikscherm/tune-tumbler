import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapBackground() {
  return (
    <MapContainer
      center={[51, -21]} // Adjust to your preferred center
      zoom={6}
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
    </MapContainer>
  );
}
