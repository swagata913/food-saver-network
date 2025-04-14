// DonorContext.js
import React, { createContext, useState, useContext } from "react";

const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  const [donor, setDonor] = useState("");
  const [liveLocation, setLiveLocation] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  return (
    <DonorContext.Provider
      value={{ donor, setDonor, liveLocation, setLiveLocation, accessToken, setAccessToken }}
    >
      {children}
    </DonorContext.Provider>
  );
};

export const useDonor = () => useContext(DonorContext);
