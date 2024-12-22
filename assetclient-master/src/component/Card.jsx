import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Card = ({ asset }) => {
  const navigate = useNavigate();
  if (!asset) {
    return <div>Loading...</div>; // Handle missing asset gracefully
  }
  // const { id, name, category, description, status } = asset;
  // console.log(asset.assetId);
  const id = asset.assetId;
  const viewDetails = () => {
    // Navigate to the detailed view of the asset (implement navigation logic here)
    navigate(`/assetDetails/${asset.assetId}`);
  };

  const requestAsset = () => {
    // Handle asset req est logic (e.g., showing a confirmation message)
    alert(`Requesting asset: ${asset.name}`);
  };

  return (
    <div className="border border-gray-300  p-6 m-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-80 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {asset.name}
      </h2>

      <p className="text-gray-600 font-medium">Category: {asset.category}</p>
      <p className="text-gray-600 mt-2">{asset.description}</p>
      <p className="text-gray-600 mt-2">
        Status:{" "}
        <span
          className={`font-semibold 
          ${asset.status === "AVAILABLE" ? "text-green-500" : "text-red-500"}`}
        >
          {asset.status}
        </span>
      </p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={viewDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          View Details
        </button>
        <button
          onClick={requestAsset}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default Card;
