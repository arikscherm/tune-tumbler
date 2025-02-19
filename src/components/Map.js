import React, { useEffect, useRef, useState } from "react";
import MapBackground from "./MapBackground";
import L from "leaflet";
import "leaflet.markercluster";
import points from "../data/sessions.json"
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


function Map() {
  const mapRef = useRef(null);
  const markersLayer = useRef(null); // Layer group for markers
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapRef.current && mapReady) {
      // If markersLayer is not set, create one
      if (!markersLayer.current) {
        markersLayer.current = L.markerClusterGroup().addTo(mapRef.current);
      }

      async function loadMarkers() {
  
        if (!markersLayer.current) {
          markersLayer.current = L.layerGroup().addTo(mapRef.current);
        }
  
        markersLayer.current.clearLayers();
  
        points.forEach(({ latitude, longitude, name, address, town, area, country }) => {
            const popupContent = `
            <strong>${name}</strong><br />
            ${address ? address + "<br />" : ""}
            ${town ? town + ", " : ""}${area ? area + "<br />" : ""}
            ${country ? country : ""}
          `;
          L.marker([parseFloat(latitude), parseFloat(longitude)])
            .bindPopup(popupContent)
            .addTo(markersLayer.current);
        });
      }
  
      loadMarkers();
    }
  }, [mapReady]);

  return (
    <div>
      <MapBackground zIndex={0} staticMap={false} onMapReady={(map) => { 
        mapRef.current = map; 
        setMapReady(true);
      }} />
    </div>
  );
}

export default Map;