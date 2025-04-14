import React, { useState, useEffect } from "react";
import pic from "../../assets/images/pic.jpg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDonor } from "../../context/DonorContext"; // Import DonorContext

const Addevent = () => {
  const { liveLocation } = useDonor(); // Access live location
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quantity: "",
    coverImage: null,
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "coverImage") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      const data = new FormData();
      data.append("quantity", formData.quantity);
      data.append("description", formData.description);
      data.append("coverImage", formData.coverImage);
      data.append("liveLocation", JSON.stringify(liveLocation)); // Append live location

      const response = await axios.post(
        "http://localhost:8000/api/v1/foodItems/add-food-item",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success) {
        setFormData({
          quantity: "",
          coverImage: null,
          description: "",
        });
        navigate("/supplierevent"); // Redirect back to Supplierevent
        alert("Food item added successfully!");
      }
    } catch (error) {
      console.error("Error adding new food item:", error);
      alert("Failed to add food item. Please try again.");
    }
  };

  return (
    <div className="max-h-screen w-screen relative">
      <img
        src={pic}
        className="object-cover w-full h-full fixed top-0 left-0"
        alt="Sample"
      />

      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-20 rounded-xl bg-gradient-to-r via-transparent to-transparent bg-opacity-10 backdrop-blur-3xl shadow-lg w-3/4 h-[600px]">
        <div className="fixed -left-60 top-1/2 transform -translate-y-1/2 w-100 h-[500px]">
          <DotLottieReact
            src="https://lottie.host/696af0cf-d25a-4d91-bddf-87d75afb80e0/q208WjeEbY.lottie"
            loop
            autoplay
          />
        </div>

        <div className="fixed top-72 -right-24 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 rounded-xl bg-gradient-to-r via-transparent to-transparent bg-opacity-20 backdrop-blur-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl text-white text-center">ADD FOODITEMS</h2>

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full p-3 bg-transparent border-b-2 border-white focus:outline-none text-white font-semibold placeholder-white"
            />
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              required
              className="w-full p-3 bg-transparent border-b-2 border-white focus:outline-none text-white font-semibold placeholder-white"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 bg-transparent border-b-2 border-white focus:outline-none text-white font-semibold placeholder-white"
            />

            <button
              type="submit"
              className="w-full p-3 bg-violet-500 text-white rounded-3xl hover:bg-violet-600 transition duration-300"
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addevent;
