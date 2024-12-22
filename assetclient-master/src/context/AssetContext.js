// import axios from "axios";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
// const AssetContext = createContext();

// const AssetProvider = ({ children }) => {
//   const navigate = useNavigate(); // Hook to navigate to different routes
//   const [assets, setAssets] = useState([]); // State to store assets
//   const [loading, setLoading] = useState(false); // State for loading
//   const [error, setError] = useState(null); // State for error
//   const [token, setToken] = useState(localStorage.getItem("token")); // Store token in state

//   const [role, setRole] = useState(null); // Store role in state

//   //getting the token from local storage
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);
//   //decode the token and set the role when the token changes
//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded token:", decodedToken);
//         setRole(decodedToken.role);
//       }
//       catch (error) {
//         console.log("Error decoding token:", error);
//         setRole(null);
//       }
//     }
//     else {
//       setRole(null);
//     }
//   }, [token])
//   //utility function for fetching all assets
//   // const navigateToDashBoard = () => {
//   //   console.log("dashboard button is clicked ", role, token);
//   //   if (role === "ADMIN" ) {
//   //     navigate("/dashboard"); // Admin dashboard
//   //   } else if (role === "USER") {
//   //     navigate("/userDashboard"); // User dashboard
//   //   } else {
//   //     console.warn("Role not found or token missing");
//   //     navigate("/login"); // Navigate to login if no role is found or token is missing
//   //   }
//   // }
//   //handle logout
//   const handleLogout = () => {
//     setToken(null); // Clear the token in context
//     localStorage.removeItem("token"); // Remove token from localStorage
//     setRole(null); // Clear the role
//     navigate("/"); // Redirect to login or home


//   }

//   // Function to fetch all assets
//   const fetchAssets = async () => {
//     setLoading(true); // Set loading to true
//     setError(null); // Clear previous errors
//     try {
//       const response = await axios.get("http://localhost:8080/api/assets", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Add token for authorization
//         },
//         withCredentials: true, // Include credentials if necessary
//       });
//       console.log("Fetched assets:", response.data); // Log the response
//       setAssets(response.data); // Update state with the fetched assets
//     } catch (err) {
//       console.error("Error fetching assets:", err);
//       setError("Failed to fetch assets. Please try again later.");
//     } finally {
//       setLoading(false); // Set loading back to false
//       setError(null); // Clear the error
//     }
//   };

//   // Function to add a new asset
//   const addAsset = async (formDataToSend) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/assets", formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });
//       setAssets((prevAssets) => [...prevAssets, response.data]); // Update state with the new asset
//       navigate("/home"); // Navigate after success
//     } catch (error) {
//       console.error("Error adding asset:", error);
//     }
//   };

//   // Fetch assets on initial load if token exists
//   useEffect(() => {
//     if (token) {
//       fetchAssets();
//     }
//     else {
//       console.error("No token found. Redirecting to login.");
//       navigate("/");
//     }
//   }, [token]);

//   // Provide context values to consuming components
//   return (
//     <AssetContext.Provider value={{ assets, fetchAssets, addAsset, loading, error, token, setToken, role, handleLogout }}>
//       {children}
//     </AssetContext.Provider>
//   );
// };

// // Custom hook to use the AssetContext
// export const useAsset = () => useContext(AssetContext);

// export { AssetProvider, AssetContext };

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AssetContext = createContext();

const AssetProvider = ({ children }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [assets, setAssets] = useState([]); // State to store assets
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error
  const [token, setToken] = useState(localStorage.getItem("token")); // Store token in state
  const [role, setRole] = useState(null); // Store role in state

  // Getting the token from local storage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Decode the token and set the role when the token changes
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        setRole(decodedToken.role);
      } catch (error) {
        console.log("Error decoding token:", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  // Handle logout
  const handleLogout = () => {
    setToken(null); // Clear the token in context
    localStorage.removeItem("token"); // Remove token from localStorage
    setRole(null); // Clear the role
    navigate("/"); // Redirect to login or home
  };

  // Function to fetch all assets
  const fetchAssets = async () => {
    if (loading) return; // Prevent multiple fetch calls during loading
    setLoading(true); // Set loading to true
    setError(null); // Clear previous errors
    try {
      const response = await axios.get("http://localhost:8080/api/assets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token for authorization
        },
        withCredentials: true, // Include credentials if necessary
      });
      console.log("Fetched assets:", response.data); // Log the response
      setAssets(response.data); // Update state with the fetched assets
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError("Failed to fetch assets. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  // Function to add a new asset
  const addAsset = async (formDataToSend) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/assets",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setAssets((prevAssets) => [...prevAssets, response.data]); // Update state with the new asset
      navigate("/home"); // Navigate after success
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  // Fetch assets on initial load if token exists
  useEffect(() => {
    if (token) {
      fetchAssets();
    } else {
      console.error("No token found. Redirecting to login.");
      navigate("/");
    }
  }, [token]);

  // Provide context values to consuming components
  return (
    <AssetContext.Provider
      value={{
        assets,
        fetchAssets,
        addAsset,
        loading,
        error,
        token,
        setToken,
        role,
        handleLogout,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

// Custom hook to use the AssetContext
export const useAsset = () => useContext(AssetContext);

export { AssetProvider, AssetContext };
