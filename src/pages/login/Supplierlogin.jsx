import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic from '../../assets/images/pic.jpg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import { useDonor } from '../../context/DonorContext';

const Supplierlogin = () => {
  const navigate = useNavigate();
  const { donor, setDonor } = useDonor();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/foodDonors/login', {
        username,
        password,
      });

      if (response.data.success) {
        const token = response.data.data.accessToken;
        setDonor(response.data.data.user);
        localStorage.setItem("accessToken", token);
        navigate('/supplierevent');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen w-screen relative">
      <img
        src={pic}
        className="object-cover w-full h-full fixed top-0 left-0"
        alt="Sample"
      />

      <div
        className="fixed top-10 left-1/2 transform -translate-x-1/2 p-6 sm:p-12 md:p-20 rounded-xl 
        bg-gradient-to-r via-transparent to-transparent bg-opacity-10 backdrop-blur-sm shadow-lg w-11/12 sm:w-3/4 md:w-3/4 h-[450px] sm:h-[600px]"
      >
        <nav
          className="w-screen h-16 flex items-center px-6 fixed -top-6 left-1/2 transform -translate-x-1/2 z-50 
    bg-gradient-to-r from-slate-900 via-transparent to-slate-900 bg-opacity-10 backdrop-blur-3xl rounded-3xl"
        >
          <a
            href="/dashboard"
            className="text-white text-2xl font-bold rounded-md transition duration-300 whitespace-nowrap"
          >
            Food Saver Network
          </a>
        </nav>

        <div className="fixed -left-60 top-1/2 transform -translate-y-1/2 w-100 h-[500px]">
          <DotLottieReact
            src="https://lottie.host/e7fff689-dcc9-4da0-8c28-9377a70cda71/pVLp1lGCWs.lottie"
            loop
            autoplay
          />
        </div>

        <div
          className="fixed top-72 sm:top-72 md:top-72 -right-24 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 sm:p-8 md:p-8 
          rounded-xl bg-gradient-to-r via-transparent to-transparent 
          bg-opacity-20 backdrop-blur-lg shadow-lg overflow-y-auto h-[450px]"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">LOGIN</h2>
            {error && (
              <p className="text-red-500 text-center font-semibold">{error}</p>
            )}
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-transparent border-b-2 border-white focus:outline-none 
                  text-white font-semibold placeholder-white"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-transparent border-b-2 border-white focus:outline-none 
                  text-white font-semibold placeholder-white"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full p-3 text-white rounded-3xl 
                  ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-800 '}`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <div className="text-center">
              <Link
                to="/forgotPassword"
                className="text-sm text-white underline  transition duration-300"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center">
              <Link
                to="/suppliersignup"
                className="w-full block text-center p-3 bg-slate-800 text-white rounded-3xl  transition duration-300 mt-4"
              >
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Supplierlogin;
