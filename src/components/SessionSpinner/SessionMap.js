import React, { useEffect, useRef, useState } from "react";
import MapBackground from "../MapBackground/MapBackground"
import '../../index.css'; // Make sure to import the CSS file
import L from "leaflet";
import "leaflet.markercluster";
import points from "../../data/sessions.json";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

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

function SessionMap() {
  const mapRef = useRef(null);
  const markersLayer = useRef(null); // Layer group for markers
  const markerMap = useRef(new Map()); // Store markers for lookup
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapRef.current && mapReady) {
      if (!markersLayer.current) {
        const markersCluster = L.markerClusterGroup({
          iconCreateFunction: function (cluster) {
            const count = cluster.getChildCount();
            let size = "small"; // Default size

            if (count > 50) size = "large";
            else if (count > 20) size = "medium";

            return L.divIcon({
              html: `<div class="cluster-icon ${size}">${count}</div>`,
              className: "custom-cluster",
              iconSize: L.point(40, 40),
            });
          },
        });
        markersLayer.current = markersCluster.addTo(mapRef.current);
      }

      async function loadMarkers() {
        if (!markersLayer.current) {
          markersLayer.current = L.layerGroup().addTo(mapRef.current);
        }

        markersLayer.current.clearLayers();
        markerMap.current.clear(); // Reset marker map

        points.forEach(({ latitude, longitude, name, address, town, area, country }) => {
          const popupContent = `
            <strong>${name}</strong><br />
            ${address ? address + "<br />" : ""}
            ${town ? town + ", " : ""}${area ? area + "<br />" : ""}
            ${country ? country : ""}
          `;
          const marker = L.marker([parseFloat(latitude), parseFloat(longitude)])
            .bindPopup(popupContent)
            .addTo(markersLayer.current);

          // Store marker by coordinates
          markerMap.current.set(`${latitude},${longitude}`, marker);
        });
      }

      loadMarkers();
    }
  }, [mapReady]);

const flyToRandomPin = () => {
  if (!mapRef.current || points.length === 0) return;

  const randomIndex = Math.floor(Math.random() * points.length);
  const { latitude, longitude } = points[randomIndex];

  // Find the marker
  const marker = markerMap.current.get(`${latitude},${longitude}`);

  if (marker) {
    const map = mapRef.current;
    const currentZoom = map.getZoom();
    const maxZoom = 8; // Prevent zooming too far

    // Check if the marker is in a cluster
    if (markersLayer.current.hasLayer(marker)) {
        // Wait for the cluster expansion animation to finish
        setTimeout(() => {
          // Zoom to the marker (don't exceed maxZoom)
          map.flyTo([parseFloat(latitude), parseFloat(longitude)], Math.min(currentZoom + 2, maxZoom), {
            animate: true,
            duration: 1.5,
          });
          markersLayer.current.zoomToShowLayer(marker, () => {
          marker.openPopup();
        }, 500); // Allow some time for cluster animation to complete
      });
    } else {
      // If the marker is not in a cluster, just fly directly to it
      map.flyTo([parseFloat(latitude), parseFloat(longitude)], Math.min(currentZoom, maxZoom), {
        animate: true,
        duration: 1.5,
      });

      // Wait for the zoom to settle before opening the popup
      setTimeout(() => {
        marker.openPopup();
      }, 1500);
    }
  }
};

  
  
  
  
  
  
  

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>      
    <button className="flyToRandomPin"
    onClick={flyToRandomPin}    
  >
    🎲 🌍
  </button>
      <MapBackground
        zIndex={0}
        staticMap={false}
        onMapReady={(map) => {
          mapRef.current = map;
          setMapReady(true);
        }}
      />

    </div>
  );
}

export default SessionMap;
