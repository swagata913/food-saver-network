import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

const Mapinitia = () => {
  const mapRef = useRef(null); // Reference for the map
  const [routingControl, setRoutingControl] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    // Initialize map
    const map = L.map("map").setView([51.505, -0.09], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Fetch origin and destination data from backend
    fetch("/api/route-data") // Replace with your actual backend API route
      .then((response) => response.json())
      .then((data) => {
        const { origin, destination } = data; // Assume backend sends { origin: "address", destination: "address" }
        setOrigin(origin);
        setDestination(destination);

        // Automatically set route if data is available
        if (origin && destination) {
          setupRouting(map, origin, destination);
        }
      })
      .catch((error) => console.error("Error fetching route data:", error));

    return () => {
      map.remove(); // Cleanup map on component unmount
    };
  }, []);

  const setupRouting = async (map, originAddress, destinationAddress) => {
    try {
      const originCoords = await geocodeAddress(originAddress);
      const destinationCoords = await geocodeAddress(destinationAddress);

      // Remove previous routing control
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Add new routing control
      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(originCoords.lat, originCoords.lng),
          L.latLng(destinationCoords.lat, destinationCoords.lng),
        ],
        routeWhileDragging: true,
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    } catch (error) {
      console.error("Error setting up routing:", error);
    }
  };

  // Geocoding function
  const geocodeAddress = async (address) => {
    const apiKey = "040e6c0e5ca9400eaeae724b5223d10a"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error("Address not found");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default Mapinitia;