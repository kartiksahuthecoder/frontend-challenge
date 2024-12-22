import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls
import { jwtDecode } from "jwt-decode"; // For decoding JWT tokens

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null); // To store user details
  const [assets, setAssets] = useState([]); // To store borrowed assets
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    // Decode the token to extract the email
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;

    // if (!email) {
    //   console.log("Token", token, decodedToken);
    //   setError("Email not found in token.");
    //   setLoading(false);
    //   return;
    // }

    // Fetch user and asset details
    const fetchUserDashboard = async () => {
      try {
        await axios
          .get(
            `http://localhost:8080/api/borrowed-assets/searchByEmail?email=${email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("User assets", response.data);
            setAssets(response.data);
            setUserInfo({ email: email });
            setLoading(false);
          })
          .catch((error) => {
            setError("Failed to fetch user data.");
            setLoading(false);
          });
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          Welcome, {userInfo.email}
        </h1>
        <p className="text-gray-500 mt-2">
          Here's an overview of your borrowed assets.
        </p>
      </header>

      {/* Borrowed Assets */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Borrowed Assets
        </h2>
        {Array.isArray(assets) && assets.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {assets.map((asset, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {asset.name}
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  <span className="font-medium text-gray-700">AssetID:</span>{" "}
                  {asset.assetId}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  {asset.status}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium text-gray-700">
                    Borrowed On:
                  </span>{" "}
                  {new Date(asset.borrowDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">
                    Return Date:
                  </span>{" "}
                  {new Date(asset.returnDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have not borrowed any assets.</p>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
