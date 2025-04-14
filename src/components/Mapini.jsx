import React from "react";
import { useLocation } from "react-router-dom";

function Mapini() {
    const location = useLocation();
    const origin = location.state?.origin;

    return (
        <iframe
            src={`http://localhost:5173/Map.html?origin=${origin?.lat},${origin?.lng}`}
            title="HTML Page"
            style={{ width: "100dvw", height: "100vh", border: "none" }}
        />
    );
}

export default Mapini;
