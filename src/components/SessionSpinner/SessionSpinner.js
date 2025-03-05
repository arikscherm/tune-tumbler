import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import '../../index.css';
import './SessionSpinner.css';
import MapBackground from "../MapBackground/MapBackground";
import session_data from "../../data/sessions.json";


// Marker appearance
const defaultIcon = L.icon({
   iconUrl: markerIcon, // Url to icon Image
   iconRetinaUrl: markerRetina, // Url to retina sized icon image
   shadowUrl: markerShadow, // Url to shadow image
   iconSize: [25, 41], // Size of the icon
   iconAnchor: [12, 41], // Bottom center of marker image
   popupAnchor: [1, -34] // Popup position
});

L.Marker.prototype.options.icon = defaultIcon;

function SessionSpinner() {
  const mapRef = useRef(null); // Reference to Leaflet map (MapBackground component)
  const markersLayer = useRef(null); // Sessions Layer
  const markerMap = useRef(new Map()); // Store markers for random selection
  const [mapReady, setMapReady] = useState(false); 

  useEffect(() => {

    // Make sure map instance has been passed up from MapBackground component
    if (mapRef.current) {
      // Ensure there is only one cluster per layer of data
      if (!markersLayer.current) {
        // Set up marker clusters
        const markersCluster = L.markerClusterGroup({
          iconCreateFunction: function (cluster) {
            // Number of pins in cluster
            const count = cluster.getChildCount();
            // assign CSS class
            const size = count > 50 ? "large" : count > 20 ? "medium" : "small";
            // Each cluster styled by class and shows number of child markers
            return L.divIcon({
              html: `<div class="cluster-icon ${size}">${count}</div>`,
              className: "cluster",
              // Change cluster icon size based on CSS class
              iconSize: size === "small" ? L.point(30, 42) : L.point(50, 50),
            });
          },
        });
        // Add cluster to markers Layer
        markersLayer.current = markersCluster.addTo(mapRef.current);
      }

      // Visualize session data
      async function loadMarkers() {
    
       //markersLayer.current.clearLayers();
       //markerMap.current.clear();

        // Get session details each markers's popup
        session_data.forEach(({ latitude, longitude, name, address, town, area, country }) => {
          const popupContent = `
            <strong>${name}</strong><br />
            ${address ? address + "<br />" : ""}
            ${town ? town + ", " : ""}${area ? area + "<br />" : ""}
            ${country ? country : ""}
          `;

          // Create marker at coordinates, bind popup with session details, add all markers to markersLayer (already clustered)
          const marker = L.marker([parseFloat(latitude), parseFloat(longitude)])
            .bindPopup(popupContent)
            .addTo(markersLayer.current);

          // Add marker to markerMap, to access random pin by coordinates for flyToRandomMarker
          markerMap.current.set(`${latitude},${longitude}`, marker);
        });
      }
      loadMarkers();
      // // Clean up function upon unmount to avoid memory leaks if markersLayer.current is not null
      return () => {
        markersLayer.current?.clearLayers();
      };
    }
  // Load the markers only when the map is initialized and ready
  }, [mapReady]);


const flyToRandomMarker = () => {
  if (!mapRef.current || session_data.length === 0) return;

  // Get random index of points and extracts its coordinates
  const randomIndex = Math.floor(Math.random() * session_data.length);
  const { latitude, longitude } = session_data[randomIndex];

  // Look up random marker based on coordinates
  const random_marker = markerMap.current.get(`${latitude},${longitude}`);

  // Fly to randomly chosen marker
  if (random_marker) {
    const map = mapRef.current;
    const maxZoom = 8; // Prevent zooming too far

    map.flyTo([parseFloat(latitude), parseFloat(longitude)], maxZoom, {
        animate: true,
        duration: 1.5,
    });
    // If marker is in a cluster, spiderfy it (open it up)
    markersLayer.current.zoomToShowLayer(random_marker, () => {
    random_marker.openPopup();
    })
  }
};
 

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>      
    <button className="flyToRandomPin"
    onClick={flyToRandomMarker}    
  >
    🎲 🌍
  </button>
      <MapBackground
        zIndex={0}
        // Render mapBackground component but make it interactive
        staticMap={false}
          // When MapBackground initializes the non static map, the map instance is passed up here.
          MapReady={(map) => { 
          mapRef.current = map;
          setMapReady(true);
        }}
      />

    </div>
  );
}

export default SessionSpinner;
