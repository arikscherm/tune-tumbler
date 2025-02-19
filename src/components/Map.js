import React, { useEffect, useRef, useState } from "react";
import MapBackground from "./MapBackground";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

// Fix missing marker issue
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor at bottom center
  popupAnchor: [1, -34], // Offset for popup
});

L.Marker.prototype.options.icon = defaultIcon;

function getRandomCoords() {
  let lat = 60 + (Math.random() - 0.5) * 20;
  let lon = -20 + (Math.random() - 0.5) * 20;
  return [lat, lon];
}

function Map() {
  const mapRef = useRef(null);
  const markersLayer = useRef(null); // Layer group for markers
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapRef.current && mapReady) {
      // If markersLayer is not set, create one
      if (!markersLayer.current) {
        markersLayer.current = L.layerGroup().addTo(mapRef.current);
      }

      // Clear existing markers before adding new ones
      markersLayer.current.clearLayers();

      for (let i = 0; i < 100; i++) {
        let coords = getRandomCoords();
        L.marker(coords)
          .bindPopup(`Marker #${i + 1}`)
          .addTo(markersLayer.current); 
      }
    }
  }, [mapReady]);

  return (
    <div>
      <MapBackground zIndex={0} onMapReady={(map) => { 
        mapRef.current = map; 
        setMapReady(true);
      }} />
    </div>
  );
}

export default Map;
