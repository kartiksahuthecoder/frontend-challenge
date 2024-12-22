// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";



// const AssetDetailsPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log("id", id);
//   const [asset, setAsset] = useState(null);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (!id) {
//       console.error("Asset ID not found. Redirecting to home page.");
//       navigate("/home");
//       return;
//     }
//     axios
//       .get(`http://localhost:8080/api/assets/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         withCredentials: true,
//       })
//       .then((response) => {
//         setAsset(response.data);
//         setError(null);
//       })
//       .catch((error) => {
//         console.error("Error fetching asset details:", error);
//         setError("Failed to load asset details. Please try again later.");
//       });
//   }, [id, navigate]);
//   // fetching user based on the id
//   const handlERequestAsset = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You need to login to request this asset");
//       return;
//     }
//     try {
//       const decodedToken =  jwtDecode(token);
//       const email = decodedToken.sub;
//       const borrowRequestPayload = {
//         email: email,
//         assetId: id,
//         borrowDate: new Date().toISOString().split("T")[0],
//         returnDate: null,
//         status: "PENDING",
//       };
//       axios
//         .post(
//           "http://localhost:8080/api/borrowed-assets",
//           borrowRequestPayload,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Asset requested successfully", response.data);
//           alert("Asset requested successfully");
//         })
//         .catch((error) => {
//           console.error("Error requesting asset:", error);
//         });
//     } catch (error) {
//       console.error("Error requesting asset:", error);
//     }
//   };
//   if (!asset && !error) {
//     return <p className="text-center">Loading asset details...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="max-w-lg w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="w-full ">
//             <img
//               src={asset.imageUrl || "https://via.placeholder.com/150"}
//               alt={asset.name}
//               className="w-full h-64 object-cover"
//             />
//           </div>

//           <div className="p-6 flex flex-col gap-3">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">
//               {asset.name}
//             </h1>
//             <p className="text-gray-600 mb-4">{asset.description}</p>
//             <p className="text-sm text-gray-500 mb-4">Status: {asset.status}</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
//               onClick={handlERequestAsset}
//             >
//               Request
//             </button>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
//               onClick={() => {
//                 navigate("/home");
//               }}
//             >
//               Home
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssetDetailsPage;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

const AssetDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Asset ID not found. Redirecting to home page.");
      navigate("/home");
      return;
    }

    axios
      .get(`http://localhost:8080/api/assets/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setAsset(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching asset details:", error);
        setError("Failed to load asset details. Please try again later.");
      });
  }, [id, navigate]);

  const handleRequestAsset = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You need to log in to request this asset");
      return;
    }
  
    try {
      // Decode the token
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
  
      // Extract user ID or email
      const userId = decodedToken.userId; // If userId exists
      const email = decodedToken.sub; // Fallback to email if userId doesn't exist
  
      if (!userId && !email) {
        throw new Error("Invalid token: userId or email is missing");
      }
  
      let finalUserId = userId;
  
      // If userId is missing but email exists, fetch userId from the backend
      if (!userId && email) {
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/email/${email}`, // Adjust endpoint to fetch user by email
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        finalUserId = userResponse.data.userId; // Ensure backend sends userId in response
      }
  
      if (!finalUserId) {
        throw new Error("User ID could not be determined");
      }
  
      // Construct the payload
      const borrowRequestPayload = {
        user: {
          userId: finalUserId, // Correct userId
        },
        asset: {
          assetId: parseInt(id, 10), // Ensure asset ID is a number
        },
        requestDate: new Date().toISOString().split("T")[0], // Current date
        status: "PENDING", // Default status
      };
  
      console.log("Payload being sent:", borrowRequestPayload);
  
      // Send the request
      const response = await axios.post(
        "http://localhost:8080/api/requests",
        borrowRequestPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Asset requested successfully:", response.data);
      alert("Asset requested successfully!");
    } catch (error) {
      console.error("Error requesting asset:", error);
  
      // Provide feedback to the user
      if (error.response && error.response.status === 400) {
        alert("Bad Request: Check the input data.");
      } else {
        alert(error.message || "An error occurred. Please try again.");
      }
    }
  };
  
  
  

  if (!asset && !error) {
    return <p className="text-center">Loading asset details...</p>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="max-w-lg w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full">
            <img
              src={asset.imageUrl || "https://via.placeholder.com/150"}
              alt={asset.name}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {asset.name}
            </h1>
            <p className="text-gray-600 mb-4">{asset.description}</p>
            <p className="text-sm text-gray-500 mb-4">Status: {asset.status}</p>
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
              onClick={handleRequestAsset}
            >
              Request
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetailsPage;
