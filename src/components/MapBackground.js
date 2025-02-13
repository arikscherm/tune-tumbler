import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapBackground() {
  return (
    <MapContainer
      center={[52.8, -14.7]} // Adjust to your preferred center
      zoom={7}
      className="map-background"
    >
      {/* Stadia Alidade Smooth Dark Layer */}
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Waymarked Trails Skating Layer */}
      <TileLayer
        url="https://tile.waymarkedtrails.org/skating/{z}/{x}/{y}.png"
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      />
      
      {/* OpenAIP Layer */}
      <TileLayer
        url="https://{s}.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{y}.png"
        attribution='<a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
        minZoom={4}
        maxZoom={14}
        tms={true}
        detectRetina={true}
        subdomains="12"
      />
    </MapContainer>
  );
}
