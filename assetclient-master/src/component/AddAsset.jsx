// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddAsset = ({ onAssetAdded }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     assetName: "",
//     category: "",
//     description: "",
//     purchaseDate: "",
//     assetValue: "",
//     status: "",
//   });
//   const [image, setImage] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     if (image) {
//       formDataToSend.append("image", image);
//     }

//     axios
//       .post("http://localhost:8080/api/assets", formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log("Asset added successfully", response);
//         // Call the onAssetAdded function passed as a prop after successful asset addition
//         if (onAssetAdded) {
//           onAssetAdded(response.data); // Pass the added asset data if needed
//         }
//         navigate("/list-assets");
//       })
//       .catch((error) => console.log("Error adding asset", error));
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Add Asset
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="assetName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Asset Name
//             </label>
//             <input
//               type="text"
//               name="assetName"
//               id="assetName"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               value={formData.assetName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Asset Category
//             </label>
//             <select
//               name="category"
//               id="category"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               value={formData.category}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">-- Select Category --</option>
//               <option value="ELECTRONICS">ELECTRONICS</option>
//               <option value="FURNITURE">FURNITURE</option>
//             </select>
//           </div>
//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               name="description"
//               id="description"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             ></textarea>
//           </div>
//           <div>
//             <label
//               htmlFor="purchaseDate"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Purchase Date
//             </label>
//             <input
//               type="date"
//               name="purchaseDate"
//               id="purchaseDate"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               value={formData.purchaseDate}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="assetValue"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Cost
//             </label>
//             <input
//               type="number"
//               name="assetValue"
//               id="assetValue"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               value={formData.assetValue}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="status"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Status
//             </label>
//             <select
//               name="status"
//               id="status"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               value={formData.status}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">-- Select Status --</option>
//               <option value="Available">Available</option>
//               <option value="Borrowed">Borrowed</option>
//               <option value="Maintenance">Maintenance</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="image" className="block text-sm font-medium mb-1">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               name="image"
//               id="image"
//               className="w-full border rounded-lg px-3 py-2"
//               onChange={handleImageChange}
//               accept="image/*"
//             />
//           </div>
//           <div className="flex justify-between mt-4">
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//               onClick={() => navigate("/list-assets")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAsset;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAsset = ({ onAssetAdded }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    assetName: "",
    category: "",
    description: "",
    purchaseDate: "",
    assetValue: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/assets",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Asset added successfully", response);

      // Notify parent component about the new asset
      if (onAssetAdded) {
        onAssetAdded(response.data);
      }

      navigate("/");
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Asset
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="assetName"
              className="block text-sm font-medium text-gray-700"
            >
              Asset Name
            </label>
            <input
              type="text"
              name="assetName"
              id="assetName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.assetName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Asset Category
            </label>
            <select
              name="category"
              id="category"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="ELECTRONICS">ELECTRONICS</option>
              <option value="FURNITURE">FURNITURE</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="purchaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Purchase Date
            </label>
            <input
              type="date"
              name="purchaseDate"
              id="purchaseDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="assetValue"
              className="block text-sm font-medium text-gray-700"
            >
              Cost
            </label>
            <input
              type="number"
              name="assetValue"
              id="assetValue"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.assetValue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="Available">Available</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              onClick={() => navigate("/auditAsset")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
