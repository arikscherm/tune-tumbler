import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "./MapBackground.css";
import "../../index.css"

function InitializeMap({ onMapReady, mapCenter, mapZoom }) {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
    map.setView(mapCenter, mapZoom); // Ensure center updates dynamically
  }, [map, onMapReady, mapCenter, mapZoom]);

  return null;
}

export default function MapBackground({ onMapReady, zIndex = 0, staticMap = true }) {
  const getInitialCenter = () => (window.innerWidth < 600 ? [62, -19] : [59, -27]);
  const getInitialZoom = () => (window.innerWidth < 600 ? 4 : 5);
  const [mapCenter, setMapCenter] = useState(getInitialCenter);
  const [mapZoom, setMapZoom] = useState(getInitialZoom);

  useEffect(() => {
    function updateMapView() {
      setMapCenter(getInitialCenter());
      setMapZoom(getInitialZoom());
    }

    window.addEventListener("resize", updateMapView);
    return () => window.removeEventListener("resize", updateMapView);
  }, []);

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
      <InitializeMap onMapReady={onMapReady} mapCenter={mapCenter} mapZoom={mapZoom} />
    </MapContainer>
  );
}
