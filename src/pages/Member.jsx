import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Member = () => {
  const [foodDonors, setFoodDonors] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [activeMembersCount, setActiveMembersCount] = useState(0); // Track active members count

  useEffect(() => {
    // Fetch Food Donors
    axios
      .post('http://localhost:8000/api/v1/fooddonors/get-all-fooddonors')
      .then((response) => setFoodDonors(response.data))
      .catch((error) => console.error('Error fetching food donors:', error));

    // Fetch NGOs
    axios
      .post('http://localhost:8000/api/v1/ngos/get-all-ngos')
      .then((response) => setNgos(response.data))
      .catch((error) => console.error('Error fetching NGOs:', error));

    // Fetch active members count
    axios
      .get('http://localhost:8000/api/v1/members/active-count')
      .then((response) => setActiveMembersCount(response.data.activeCount))
      .catch((error) => console.error('Error fetching active members count:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Members Page</h1>

      {/* Active Members Count */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700">
          Currently Logged-in Members: <span className="text-indigo-600">{activeMembersCount}</span>
        </p>
      </div>

      {/* Food Donors Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Food Donors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodDonors.map((donor, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={donor.avatar}
                alt={`${donor.username}'s avatar`}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 text-center">{donor.username}</h3>
              <p className="text-gray-600 mt-2 text-center">
                <strong>Location:</strong> {donor.location || 'Not Available'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* NGOs Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">NGOs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ngos.map((ngo, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={ngo.avatar}
                alt={`${ngo.username}'s avatar`}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 text-center">{ngo.username}</h3>
              <p className="text-gray-600 mt-2 text-center">
                <strong>City:</strong> {ngo.location?.city || 'Not Available'}
              </p>
              <p className="text-gray-600 mt-1 text-center">
                <strong>State:</strong> {ngo.location?.state || 'Not Available'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Member;
