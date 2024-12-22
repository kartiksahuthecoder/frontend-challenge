// // RegisterForm.js
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const RegisterForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("USER");
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const user = { email, password, role, name, phoneNumber, address };

//     // Make the POST request to register the user
//     axios
//       .post("http://localhost:8080/api/auth/register", user)
//       .then((response) => {
//         // Handle success (e.g., show a success message or redirect)
//         console.log("User registered successfully", response.data);
//         // You can also call onRegister if necessary
//         // onRegister(response.data);

//         // Optionally, reset the form after successful registration
//         setEmail("");
//         setPassword("");
//         setRole("USER");
//         setName("");
//         setPhoneNumber("");
//         setAddress("");
//       })
//       .catch((error) => {
//         // Handle error (e.g., show an error message)
//         console.error("Error registering user:", error);
//         // You can also display an error message to the user
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         className="bg-white p-6 rounded shadow-md w-1/2 max-w-full flex flex-col justify-between"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-xl font-bold mb-4 text-gray-700">Register</h2>
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Name</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Phone Number</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Address</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </div>
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
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Role</label>
//           <select
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="ADMIN">ADMIN</option>
//             <option value="USER">USER</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;


import axios from "axios";
import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    role: "USER",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setError(null);
      const { confirmPassword, ...dataToSubmit } = formData; // Exclude confirmPassword
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        dataToSubmit
      );
      setSuccessMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        role: "USER",
      });
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm">{successMessage}</div>
        )}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
          <label className="block text-gray-600 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

