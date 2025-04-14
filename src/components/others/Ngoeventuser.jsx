import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Ngoeventuser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Initialize state to store event data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/foodItems/get-food-items-list",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("API Response:", response.data); // Debugging the API response
        if (Array.isArray(response.data)) {
          setData(response.data.data); // Set data if response is an array
        } else if (response.data && Array.isArray(response.data.items)) {
          setData(response.data.data); // Adjust based on actual response structure
        } else {
          console.error("Unexpected data structure:", response.data);
          setData(response.data.data); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data on component mount

  const handleInterested = (eventId) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          navigate("/map", {
            state: { origin: { lat: latitude, lng: longitude }, eventId },
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert(
            "Unable to fetch your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="p-14">
      <nav className="w-11/12 h-16 flex items-center justify-between px-6 fixed top-3 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 bg-opacity-10 backdrop-blur-3xl rounded-3xl">
        <a
          href="/dashboard"
          className="text-white text-2xl font-bold rounded-md transition duration-300 whitespace-nowrap"
        >
          Food Saver Network
        </a>
        <div className="flex items-center space-x-2 ml-auto mr-6">
          <Link
            to="/map"
            className="px-4 py-2 text-white border-2 border-white rounded-3xl hover:bg-white hover:text-black transition duration-300"
          >
            MAPS
          </Link>
          <Link
            to="/help"
            className="px-4 py-2 text-white border-2 border-white rounded-3xl hover:bg-white hover:text-black transition duration-300"
          >
            HELP
          </Link>
          <Link
            to="/history"
            className="px-4 py-2 text-white border-2 border-white rounded-3xl hover:bg-white hover:text-black transition duration-300"
          >
            HISTORY
          </Link>
          <Link
            to="/logout"
            className="px-4 py-2 text-white border-2 border-white rounded-3xl hover:bg-white hover:text-black transition duration-300"
          >
            LOGOUT
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <h1 className="text-2xl font-bold text-center mb-6">
        Events You Might Be Interested In
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map(({ _id, description, quantity, coverImage }) => (
            <div
              key={_id}
              className="border rounded-lg shadow-lg p-4 bg-yellow-500 hover:shadow-2xl transition duration-300"
            >
              <img
                src={coverImage}
                alt={name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-lg font-semibold">{description}</h2>
              <p className="text-black">Location: {quantity}</p>
              <button
                className="w-full mt-4 bg-green-500 text-white p-2 rounded"
                onClick={() => handleInterested(_id)}
              >
                Interested
              </button>
            </div>
          ))
        ) : (       
          <p className="text-center col-span-full">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Ngoeventuser;

