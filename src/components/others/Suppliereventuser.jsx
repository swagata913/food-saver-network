import React, { useEffect, useState } from "react";
import { useDonor } from "../../context/DonorContext"; // Import useDonor
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Suppliereventuser = () => {
  const { donor, setDonor } = useDonor(); // Access context values
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    if (!donor) {
      console.error("Donor is missing!"); // Add logging for missing context
      return;
    }

    const fetchFoodItems = async () => {
      try {
        const donorId = donor._id;
        console.log(`Access toke -> ${localStorage.getItem("accessToken")}`);

        const response = await axios.post(
          "http://localhost:8000/api/v1/foodItems/get-food-items-list",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { data } = response; // Destructure response
        console.log("Food items:", data); // Log the data directly
        setFoodItems(data.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []); // Dependency array includes donor

  return (
    <div className="min-h-screen rounded-[50px] bg-gray-950 py-10 px-5">
      <nav
        className="w-11/12 h-16 flex items-center justify-between px-6 fixed top-3 left-1/2 transform -translate-x-1/2 z-50 
        bg-gradient-to-r from-slate-900 via-transparent to-slate-900 bg-opacity-10 backdrop-blur-3xl rounded-3xl"
      >
        <a
          href="/dashboard"
          className="text-white text-2xl font-bold rounded-md"
        >
          Food Saver Network
        </a>
        <button onClick={() => navigate("/addevent")} className="text-white">
          Add Event
        </button>
      </nav>
      <h1 className="text-3xl font-bold text-center text-gray-300 mt-10">
        Your Events
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item._id} className="bg-yellow-500 p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2"></p>
            <p className="text-xl font-bold mb-4">{item.description}</p>
            
            <p className="text-lg font-semibold">Quantity:</p>
            <p className="text-lg mb-4">{item.quantity}</p>
            
            {/* Display the image */}
            <img 
              src={item.coverImage} 
              alt={item.description || "Food item"} 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          
          ))
        ) : (
          <p className="text-gray-400">No events found</p>
        )}
      </div>
    </div>
  );
};

export default Suppliereventuser;
