// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const credentials = { email, password };

//     // Sending login credentials to the backend
//     axios
//       .post(
//         "http://localhost:8080/api/auth/login",
//         JSON.stringify(credentials),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         if (response.status === 200) {
//           // Save the token in the local storage
//           console.log("User logged in successfully", response.data);

//           // Log the token to the console

//           // Save the token to localStorage
//           localStorage.setItem("token", response.data);

//           // Redirect to the home page
//           navigate("/home");
//         }
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 401) {
//           console.log("Error logging in:", error);
//           setErrorMessage("Invalid email or password");
//         } else {
//           setErrorMessage("An error occurred. Please try again.");
//         }
//       });

//     // Clear the input fields
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         className="bg-white p-6 rounded shadow-md w-1/2 h-full "
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-xl font-bold mb-4 text-gray-700">Login</h2>
//         {errorMessage && (
//           <div className="text-red-600 mb-4">{errorMessage}</div>
//         )}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Email</label>
//           <input
//             type="email"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Password</label>
//           <input
//             type="password"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

// import axios from "axios";
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AssetContext } from "../context/AssetContext";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const { setToken } = useContext(AssetContext); // Use context to update token
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const credentials = { email, password };

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         JSON.stringify(credentials),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         const token = response.data; // Assuming backend returns the JWT token
//         localStorage.setItem("token", token); // Save token in local storage
//         setToken(token); // Update context token
//         navigate("/home"); // Redirect to the home page
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setErrorMessage("Invalid email or password");
//       } else {
//         setErrorMessage("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
//         {errorMessage && (
//           <div className="text-red-600 mb-4">{errorMessage}</div>
//         )}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Email</label>
//           <input
//             type="email"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Password</label>
//           <input
//             type="password"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsset } from "../context/AssetContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setToken } = useAsset(); // Access the context to update the token
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data); // Save the token in localStorage
        setToken(response.data); // Update the context with the new token
        navigate("/home"); // Redirect to the main page
      }
    } catch (error) {
      setErrorMessage(
        error.response?.status === 401
          ? "Invalid email or password"
          : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 transition"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
