// import React, { useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
// import { AssetContext } from "../context/AssetContext"; // Correct path to your AssetContext

// const Navbar = () => {
//   // const [role, setRole] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const { token, setToken } = useContext(AssetContext);

//   // Fetch token from localStorage when component mounts
//   // useEffect(() => {
//   //   const savedToken = localStorage.getItem("token");
//   //   if (savedToken) {
//   //     setToken(savedToken); // Set the token from localStorage if it exists
//   //   }
//   // }, [setToken]);

//   // // Decode token and set the role when the token changes
//   // useEffect(() => {
//   //   if (token) {
//   //     try {
//   //       const decodedToken = jwtDecode(token); // Decode the token to get the role
//   //       if (decodedToken?.role) {
//   //         setRole(decodedToken.role); // Set role from the decoded token
//   //       } else {
//   //         console.warn("Role not found in token");
//   //         setRole(null);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error decoding token:", error);
//   //       setRole(null); // Reset role in case of decoding errors
//   //     }
//   //   } else {
//   //     setRole(null); // Reset role when token is cleared
//   //   }
//   // }, [token]);

//   // const handleLogout = () => {
//   //   setToken(null); // Clear token from context
//   //   localStorage.removeItem("token"); // Remove token from localStorage
//   //   setRole(null); // Reset role state
//   //   navigate("/"); // Navigate to the login page
//   // };

//   const { token, role, handleLogout } = useContext(AssetContext);
//   // const navigateToDashboard = () => {
//   //   if (role === "ADMIN" && token) {
//   //     navigate("/dashboard"); // Admin dashboard
//   //   } else if (role === "USER" && token) {
//   //     navigate("/userDashboard"); // User dashboard
//   //   } else {
//   //     console.warn("Role not found or token missing");
//   //     navigate("/login"); // Navigate to login if no role is found or token is missing
//   //   }
//   // };
//   useEffect(() => {
//     console.log("Token in Navbar:", token);
//     console.log("Role in Navbar:", role);
//   }, [token, role]);
//   return (
//     <header className="m-2">
//       <nav className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
//         {/* Logo */}
//         <div className="font-semibold text-2xl font-[Poppins]">
//           <h1>Asset Management System</h1>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-6 font-medium">
//           <a href="/home" className="hover:text-blue-500 px-4 py-2">
//             Assets
//           </a>
          
//           {
//             // Show Add Asset button only if role is ADMIN and token exists
//             role === "ADMIN" && token && (
//               <button
//                 className="hover:text-blue-500 px-4 py-2"
//                 onClick={() => {
//                   navigate("/add-asset");
//                 }}
//               >
//                 Add Asset
//               </button>
//             )
//           }
//           {
//             // Show Login button if token is not present, else show Logout button
//             !token ? (
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
//                 onClick={() => {
//                   navigate("/login");
//                 }}
//               >
//                 Login
//               </button>
//             ) : (
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             )
//           }
//         </div>

//         {/* Mobile Menu Toggle */}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

/* Updated Navbar.jsx */



// import React, { useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AssetContext } from "../context/AssetContext";
// import axios from "axios";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { token, role, handleLogout } = useContext(AssetContext);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (token) {
//       fetchNotifications();
//     }
//   }, [token]);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/notifications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setNotifications(response.data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const handleAssetsClick = () => {
//     if (role === "ADMIN") {
//       navigate("/auditAsset"); // Redirect admin to the Audit Asset page
//     } else {
//       navigate("/home"); // Redirect user to the main body (available assets)
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         <h1
//           className="text-white font-bold text-xl cursor-pointer"
//           onClick={() => navigate("/home")}
//         >
//           Asset Management System
//         </h1>
//         <ul className="flex items-center gap-6 text-white">
//           <li className="hover:underline">
//             <button onClick={handleAssetsClick}>Assets</button>
//           </li>
//           <li className="hover:underline">
//             <a href="/dashboard">Dashboard</a>
//           </li>
//           {role === "ADMIN" && token && (
//             <li>
//               <button
//                 className="hover:underline"
//                 onClick={() => navigate("/add-asset")}
//               >
//                 Add Asset
//               </button>
//             </li>
//           )}
//           <li className="relative">
//             <button
//               className="relative"
//               onClick={() => navigate("/notifications")}
//             >
//               <i className="fa fa-bell text-lg"></i>
//               <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
//                 {notifications.length || 0}
//               </span>
//             </button>
//           </li>
//           <li>
//             {token ? (
//               <button
//                 className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-400 transition"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>
//             )}
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AssetContext } from "../context/AssetContext";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, role, handleLogout } = useContext(AssetContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleAssetsClick = () => {
    if (role === "ADMIN") {
      navigate("/auditAsset"); // Redirect admin to the Audit Asset page
    } else {
      navigate("/home"); // Redirect user to the main body (available assets)
    }
  };

  const handleDashboardClick = () => {
    if (role === "ADMIN") {
      navigate("/dashboard");
    } else if (role === "USER") {
      navigate("/userDashboard");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Asset Management System
        </h1>
        <ul className="flex items-center gap-6 text-white">
          <li className="hover:underline">
            <button onClick={handleAssetsClick}>Assets</button>
          </li>
          <li className="hover:underline">
            <button onClick={handleDashboardClick}>Dashboard</button>
          </li>
          {role === "ADMIN" && token && (
            <li>
              <button
                className="hover:underline"
                onClick={() => navigate("/add-asset")}
              >
                Add Asset
              </button>
            </li>
          )}
          <li className="relative">
            <button
              className="relative"
              onClick={() => navigate("/notifications")}
            >
              <i className="fa fa-bell text-lg"></i>
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                {notifications.length || 0}
              </span>
            </button>
          </li>
          <li>
            {token ? (
              <button
                className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-400 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
