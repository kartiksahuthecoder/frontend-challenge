// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "./Card";
// import axios from "axios";

// import { AssetContext, useAsset } from "../context/AssetContext";

// const Body = () => {
//   const navigate = useNavigate();
//   const yourToken = localStorage.getItem("token");
//   // const [assets, setAssets] = useState([]);
//   const { assets, fetchAssets, loading, error, role, token } = useAsset(AssetContext);
//   // useEffect(() => {
//   //   fetchAssets(); // Fetch assets when the component mounts
//   // }, []);
//   // Function to fetch all assets
//   // const fetchAssets = () => {
//   //   axios
//   //     .get("http://localhost:8080/api/assets", {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${yourToken}`,
//   //       },
//   //       withCredentials: true,
//   //     })
//   //     .then((response) => {
//   //       console.log(response.data); // Verify the data structure
//   //       setAssets(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching assets:", error);
//   //     });
//   // };

//   // Fetch assets on initial load
//   useEffect(() => {
//     if (!yourToken) {
//       console.error("No token found. Redirecting to login.");
//       navigate("/login");
//     } else {
//       fetchAssets();
//     }
//   }, [yourToken, navigate]);
//   const navigateToDashboard = () => {
//     if (role === "ADMIN") {
//       navigate("/dashboard"); // Admin dashboard
//     } else if (role === "USER") {
//       navigate("/userDashboard"); // User dashboard
//     } else {
//       console.warn("Role not found or token missing");
//       navigate("/"); // Navigate to login if no role is found or token is missing
//     }
//   };

//   return (
//     <div className="m-2 p-4">
//       <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg shadow-lg mb-6 flex items-center justify-between">
//         <div className="text-xl font-semibold">⚠️ Use Assets Carefully!</div>
//         <div className="text-sm">
//           Please ensure the proper use of all available assets. Follow the
//           guidelines.
//         </div>
//         <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition duration-300">
//           {/* refer to add asset form page */}
//           Learn more
//         </button>
//       </div>
//       <button
//         className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition duration-300"
//         onClick={navigateToDashboard}
//       >
//         {" "}
//         Dashboard
//       </button>

//       <div className="font-semibold text-3xl mb-6 text-center">
//         Welcome to the Asset Management Page!
//       </div>
//       {loading && <div className="text-center">Loading assets...</div>}
//       {error && <div className="text-center text-red-500">{error}</div>}

//       <div className="flex flex-wrap gap-4">
//         {assets.map((asset) => (
//           <Card key={asset.assetId} asset={asset} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Body;

/* Updated Body.jsx */
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { AssetContext } from "../context/AssetContext";

const Body = () => {
  const navigate = useNavigate();
  const { assets, fetchAssets, loading, error, role, token } = useContext(AssetContext);
  const [fetchAttempted, setFetchAttempted] = useState(false); // Track if fetch has been attempted

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   } else if (role === "ADMIN") {
  //     navigate("/dashboard");
  //   } else if (role === "USER" ){
  //     navigate("/userDashboard");
  //   }
      
  //     else if(!fetchAttempted) {
  //     // Fetch assets only if not already attempted
  //     setFetchAttempted(true);
  //     fetchAssets();
  //   }
  // }, [role, token, navigate, fetchAttempted, fetchAssets]);
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {role === "USER" && (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-12 px-8 rounded-lg shadow-lg mb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold mb-4">Welcome to the Asset Management System</h1>
              <p className="text-lg mb-6">
                Explore and manage your assets effortlessly.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Available Assets</h2>

            {loading && (
              <div className="text-center text-gray-500">
                <span>Loading assets...</span>
              </div>
            )}
            {error && (
              <div className="text-center text-red-500">
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {assets.map((asset) => (
                  <Card key={asset.assetId} asset={asset} />
                ))}
              </div>
            )}

            {!loading && !error && assets.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>No assets available at the moment.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;

