import axios from "axios";
import React, { useState, useEffect } from "react";

const AuditAsset = () => {
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState({
    assetName: "",
    category: "",
    description: "",
    status: "",
  }); // Holds the asset being edited

  // Fetch Assets
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/assets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Delete Asset
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/assets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        const updatedAssets = assets.filter((asset) => asset.assetId !== id);
        setAssets(updatedAssets);
      })
      .catch((error) => {
        console.error("Error deleting asset: ", error);
      });
  };

  // Save Updated Asset
  const handleSave = () => {
    if (editingAsset) {
      axios
        .put(
          `http://localhost:8080/api/assets/${editingAsset.assetId}`,
          editingAsset,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const updatedAssets = assets.map((asset) =>
            asset.assetId === response.data.assetId ? response.data : asset
          );
          setAssets(updatedAssets);
          setEditingAsset(null); // Close the editing form
        })
        .catch((error) => {
          console.error("Error updating asset: ", error);
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Assets</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Asset Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.assetId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.assetName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => setEditingAsset(asset)} // Open edit form
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset.assetId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No assets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingAsset && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Edit Asset</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="mb-2">
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                value={editingAsset.assetName}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    assetName: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Category</label>
              <input
                type="text"
                value={editingAsset.category}
                onChange={(e) =>
                  setEditingAsset({ ...editingAsset, category: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Description</label>
              <textarea
                value={editingAsset.description}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    description: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Status</label>
              <input
                type="text"
                value={editingAsset.status}
                onChange={(e) =>
                  setEditingAsset({ ...editingAsset, status: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuditAsset;
