import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import pic from "../../assets/images/pic.jpg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Signup = () => {
  const navigate = useNavigate();

  // Individual state variables for each form field
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [ngoLicense, setNgoLicense] = useState("");
  const [location, setLocation] = useState({ city: "", state: "" });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      // Create a FormData object for the form submission
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("password", password);
      formData.append("contactInfo", contactInfo);
      formData.append("email", email);
      formData.append("avatar", avatar);
      formData.append("ngoLicense", ngoLicense);
      formData.append("city", location.city);
      formData.append("state", location.state);

      // Send POST request to API
      const response = await axios.post(
        "http://localhost:8000/api/v1/ngos/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Handle success or failure
      if (response.data.success) {
             navigate("/event");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen w-screen relative">
      {/* Background Image */}
      <img
        src={pic}
        className="object-cover w-full h-full fixed top-0 left-0"
        alt="Background"
      />

      {/* Main Container */}
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-6 sm:p-12 md:p-20 rounded-xl 
        bg-gradient-to-r via-transparent to-transparent bg-opacity-10 backdrop-blur-sm shadow-lg w-11/12 sm:w-3/4 md:w-3/4 h-[450px] sm:h-[600px]">

        {/* Navbar */}
        <nav className="w-screen h-16 flex items-center px-6 fixed -top-6 left-1/2 transform -translate-x-1/2 z-50 
          bg-gradient-to-r from-slate-900 via-transparent to-slate-900 bg-opacity-10 backdrop-blur-3xl rounded-3xl">
          <a 
            href="/dashboard" 
            className="text-white text-2xl font-bold rounded-md transition duration-300 whitespace-nowrap"
          >
            Food Saver Network
          </a>
        </nav>

        {/* Animation */}
        <div className="fixed -left-60 top-1/2 transform -translate-y-1/2 w-100 h-[500px]">
          <DotLottieReact
            src="https://lottie.host/22dec8a7-cfaf-4c5e-aa8e-be1fa3cd4540/ni8NCcr1Mh.lottie"
            loop
            autoplay
          />
        </div>

        {/* Signup Form */}
        <div className="fixed top-72 sm:top-72 md:top-72 -right-24 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 sm:p-8 md:p-8 
          rounded-xl bg-gradient-to-r via-transparent to-transparent 
          bg-opacity-20 backdrop-blur-lg shadow-lg overflow-y-auto h-[450px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">REGISTER</h2>

            {error && (
              <p className="text-red-500 text-center font-semibold">{error}</p>
            )}

            {/* Username */}
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                required
              />
            </div>

            {/* Full Name */}
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>

            {/* Contact Info */}
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Enter Contact Info"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>

            {/* NGO License */}
            <div>
              <label className="text-white block mb-2">NGO DARPAN License</label>
              <input
                type="text"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                placeholder="Format: AB/YYYY/XXXXXXX"
                pattern="[A-Z]{2}/\d{4}/\d{7}" // Regex for NGO DARPAN License
                title="Format: Two uppercase letters, a forward slash, four digits for the year, another forward slash, and seven digits (e.g., AB/2023/1234567)"
                value={ngoLicense}
                onChange={(e) => setNgoLicense(e.target.value)}
                required
              />
            </div>

            {/* Location (City and State as Strings) */}
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300 mb-3"
                value={location.state}
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
                placeholder="Enter State"
                required
              />
              <input
                type="text"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
                placeholder="Enter City"
                required
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="text-white block mb-2">Avatar</label>
              <input
                type="file"
                className="w-full p-3 bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-b-4 focus:border-white transition-all duration-300"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full p-3 bg-gray-800 text-white rounded-3xl  transition duration-300 ${isLoading ? 'cursor-not-allowed bg-gray-400' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'REGISTER'}
              </button>
              <div className="text-center">
                <Link
                  to="/Ngologin"
                  className="w-full block text-center p-3 bg-white text-blue-950 rounded-3xl mt-4"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
