import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "./MapBackground.css";
import "../../index.css"

  // Initialize Leaflet useMap instance
function InitializeMap({ MapReady, mapCenter, mapZoom }) {
  const map = useMap();
  useEffect(() => {
    
    // Ensure SessionSpinner component only loads markers after map is initalized
    if (MapReady) {
      MapReady(map);
    }
    // Dynamically update map center depending on mobile or non mobile view
    map.setView(mapCenter, mapZoom);
  }, [map, MapReady, mapCenter, mapZoom]);

  return null;
}
// Default as static map, unless called from Session Spinner where staticMap is passed as false
export default function MapBackground({ MapReady, zIndex = 0, staticMap = true }) {
  // Set the map center for mobile and non mobile devices
  const initialCenter = () => (window.innerWidth < 600 ? [62, -19] : [59, -27]);
  const initialZoom = () => (window.innerWidth < 600 ? 4 : 5);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [mapZoom, setMapZoom] = useState(initialZoom);

  useEffect(() => {
    function updateMapView() {
      // update the state for zoom and center
      setMapCenter(initialCenter);
      setMapZoom(initialZoom);
    }
    // Listen for dynamic resizing of window
    window.addEventListener("resize", updateMapView);
    return () => window.removeEventListener("resize", updateMapView);
  }, []);

  // use City Lights imagery from NASA for tiles
  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      zoomControl={false}
      className="map-background"
      style={{ zIndex }}
      dragging={!staticMap}
      scrollWheelZoom={!staticMap}
      touchZoom={!staticMap}
      doubleClickZoom={!staticMap}
      keyboard={!staticMap}
      boxZoom={!staticMap}
    >
      <TileLayer
        url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/time/{tilematrixset}{maxZoom}/{z}/{y}/{x}.jpg"
        attribution='&copy; Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (&copy; <a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
        time=""
        tilematrixset="GoogleMapsCompatible_Level"
        maxZoom={8}
        minZoom={1}
      />
      <InitializeMap MapReady={MapReady} mapCenter={mapCenter} mapZoom={mapZoom} />
    </MapContainer>
  );
}
