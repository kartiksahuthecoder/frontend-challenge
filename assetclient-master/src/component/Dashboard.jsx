// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableHead,
//   Table,
//   Divider,
// } from "@mui/material";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import LaptopIcon from "@mui/icons-material/Laptop";
// import ChairIcon from "@mui/icons-material/Chair";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = () => {
//   const navigate = useNavigate();
//   // Dummy data
//   const dummyBorrowedAsset = [
//     {
//       id: 1,
//       name: "Laptop",
//       type: "Electronics",
//       borrower: "John Doe",
//       dateBorrowed: "2024-12-01",
//     },
//     {
//       id: 2,
//       name: "Projector",
//       type: "Electronics",
//       borrower: "Jane Smith",
//       dateBorrowed: "2024-12-03",
//     },
//     {
//       id: 3,
//       name: "Office Chair",
//       type: "Furniture",
//       borrower: "Alice Brown",
//       dateBorrowed: "2024-12-02",
//     },
//   ];
//   const dummyAssetTypes = [
//     { name: "Electronics", count: 2 },
//     { name: "Furniture", count: 1 },
//   ];
//   const dummyTotalBorrowed = 3;
//   const [borrowedAssets, setBorrowedAsset] = useState([]);
//   const [assetTypes, setAssetTypes] = useState([]);
//   const [totalBorrowed, setTotalBorrowed] = useState(0);

//   useEffect(() => {
//     setBorrowedAsset(dummyBorrowedAsset);
//     setAssetTypes(dummyAssetTypes);
//     setTotalBorrowed(dummyTotalBorrowed);
//   }, []);

//   // Function to create gradient colors for the pie chart
//   const createGradient = (ctx, chartArea) => {
//     const gradient = ctx.createLinearGradient(
//       0,
//       chartArea.top,
//       0,
//       chartArea.bottom
//     );
//     gradient.addColorStop(0, "rgba(255, 99, 132, 1)"); // Red
//     gradient.addColorStop(0.5, "rgba(54, 162, 235, 1)"); // Blue
//     gradient.addColorStop(1, "rgba(75, 192, 192, 1)"); // Green
//     return gradient;
//   };

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ fontWeight: "bold", color: "#333" }}
//       >
//         Admin Dashboard
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             console.log("Audit Assets");
//             navigate("/auditAsset");
//           }}
//         >
//           Audit Assets
//         </Button>
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Borrowed Asset Table */}
//         <Grid item xs={12}>
//           <Card
//             sx={{
//               padding: 3,
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               borderRadius: "12px",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Borrowed Assets
//             </Typography>
//             <Divider sx={{ marginBottom: 2 }} />
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>Asset Name</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Borrower</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     Date Borrowed
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {borrowedAssets.map((asset) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell>
//                       {asset.type === "Electronics" ? (
//                         <LaptopIcon sx={{ marginRight: 1 }} />
//                       ) : (
//                         <ChairIcon sx={{ marginRight: 1 }} />
//                       )}
//                       {asset.name}
//                     </TableCell>
//                     <TableCell>{asset.type}</TableCell>
//                     <TableCell>{asset.borrower}</TableCell>
//                     <TableCell>{asset.dateBorrowed}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Card>
//         </Grid>

//         {/* Total Borrowed Assets */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               padding: 3,
//               textAlign: "center",
//               backgroundColor: "#1976d2",
//               color: "#fff",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Total Borrowed Assets
//             </Typography>
//             <Typography variant="h3" sx={{ fontWeight: "bold" }}>
//               {totalBorrowed}
//             </Typography>
//           </Card>
//         </Grid>

//         {/* Assets by Type (Pie Chart) */}
//         <Grid item xs={12} sm={6} md={8}>
//           <Card
//             sx={{
//               padding: 3,
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               borderRadius: "12px",
//             }}
//           >
//             <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
//               Assets by Type
//             </Typography>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "300px",
//               }}
//             >
//               <Pie
//                 data={{
//                   labels: assetTypes.map((assetType) => assetType.name),
//                   datasets: [
//                     {
//                       data: assetTypes.map((assetType) => assetType.count),
//                       backgroundColor: [
//                         "rgba(255, 99, 132, 0.6)", // Red
//                         "rgba(54, 162, 235, 0.6)", // Blue
//                         "rgba(75, 192, 192, 0.6)", // Green
//                       ],
//                       borderColor: [
//                         "rgba(255, 99, 132, 1)", // Red
//                         "rgba(54, 162, 235, 1)", // Blue
//                         "rgba(75, 192, 192, 1)", // Green
//                       ],
//                       borderWidth: 1,
//                     },
//                   ],
//                 }}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     legend: { position: "bottom" },
//                     tooltip: {
//                       callbacks: {
//                         label: (tooltipItem) =>
//                           `${tooltipItem.label}: ${tooltipItem.raw}`,
//                       },
//                     },
//                   },
//                 }}
//                 width={20} // Set pie chart width to be smaller
//                 height={20} // Set pie chart height to be smaller
//               />
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableHead,
//   Table,
//   Button,
// } from "@mui/material";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = () => {
//   const [borrowedAssets, setBorrowedAssets] = useState([]);
//   const [assetTypes, setAssetTypes] = useState([]);
//   const [totalBorrowed, setTotalBorrowed] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState([]);

//   // Fetch Pending Requests
//   const fetchPendingRequests = async () => {
//     try {
//       // Uncomment the API call and comment out the dummy data when integrating with the backend
//       // const token = localStorage.getItem("token");
//       // const response = await axios.get("http://localhost:8080/api/requests/pending", {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
//       // setPendingRequests(response.data);

//       // Dummy data
//       const dummyRequests = [
//         {
//           id: 1,
//           assetName: "Laptop",
//           requestedBy: "John Doe",
//           requestDate: "2024-12-01",
//         },
//         {
//           id: 2,
//           assetName: "Chair",
//           requestedBy: "Jane Smith",
//           requestDate: "2024-12-02",
//         },
//       ];
//       setPendingRequests(dummyRequests);
//     } catch (error) {
//       console.error("Error fetching pending requests:", error);
//     }
//   };

//   const fetchDashboardData = async () => {
//     try {
//       // Uncomment the API calls and comment out the dummy data when integrating with the backend
//       // const token = localStorage.getItem("token");
//       // const borrowedResponse = await axios.get("http://localhost:8080/api/borrowed-assets/all", {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
//       // const assetTypesResponse = await axios.get("http://localhost:8080/api/assets/types", {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });

//       // Dummy data
//       const dummyBorrowedAssets = [
//         {
//           id: 1,
//           name: "Dell Laptop",
//           type: "Electronics",
//           borrower: "John Doe",
//           dateBorrowed: "2024-11-28",
//         },
//         {
//           id: 2,
//           name: "Office Chair",
//           type: "Furniture",
//           borrower: "Jane Smith",
//           dateBorrowed: "2024-11-29",
//         },
//       ];

//       const dummyAssetTypes = [
//         { name: "Electronics", count: 10 },
//         { name: "Furniture", count: 5 },
//       ];

//       setBorrowedAssets(dummyBorrowedAssets);
//       setAssetTypes(dummyAssetTypes);
//       setTotalBorrowed(dummyBorrowedAssets.length);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   // Update Asset Status API
//   const updateAssetStatus = async (assetId, status) => {
//     try {
//       // Uncomment the API call and comment out the dummy logic when integrating with the backend
//       // await axios.put(`http://localhost:8080/api/assets/${assetId}/status?status=${status}`);

//       // Dummy logic
//       console.log(`Updated asset ${assetId} to status: ${status}`);
//     } catch (error) {
//       console.error(`Error updating asset status for asset ${assetId}:`, error);
//     }
//   };

//   // Fetch all data on component mount
//   useEffect(() => {
//     fetchPendingRequests();
//     fetchDashboardData();
//   }, []);

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
//         Admin Dashboard
//       </Typography>
//       <Grid container spacing={4}>
//         {/* Pending Requests */}
//         <Grid item xs={12}>
//           <Card className="bg-white shadow-md rounded-lg overflow-hidden">
//             <Typography variant="h6" className="bg-gray-200 p-4 font-bold">
//               Pending Requests
//             </Typography>
//             <Table className="w-full">
//               <TableHead>
//                 <TableRow>
//                   <TableCell className="font-bold">ID</TableCell>
//                   <TableCell className="font-bold">Asset Name</TableCell>
//                   <TableCell className="font-bold">Requested By</TableCell>
//                   <TableCell className="font-bold">Request Date</TableCell>
//                   <TableCell className="font-bold">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {pendingRequests.length > 0 ? (
//                   pendingRequests.map((request) => (
//                     <TableRow key={request.id} className="hover:bg-gray-50">
//                       <TableCell>{request.id}</TableCell>
//                       <TableCell>{request.assetName}</TableCell>
//                       <TableCell>{request.requestedBy}</TableCell>
//                       <TableCell>{request.requestDate}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="success"
//                           className="mr-2"
//                           onClick={() => updateAssetStatus(request.id, "Accepted")}
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           onClick={() => updateAssetStatus(request.id, "Rejected")}
//                         >
//                           Reject
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan="5" className="text-center text-gray-500">
//                       No pending requests.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Card>
//         </Grid>

//         {/* Borrowed Asset Table */}
//         <Grid item xs={12}>
//           <Card sx={{ padding: 3, boxShadow: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Borrowed Assets
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell className="font-bold">Asset Name</TableCell>
//                   <TableCell className="font-bold">Type</TableCell>
//                   <TableCell className="font-bold">Borrower</TableCell>
//                   <TableCell className="font-bold">Borrowed Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {borrowedAssets.map((asset) => (
//                   <TableRow key={asset.id}>
//                     <TableCell>{asset.name}</TableCell>
//                     <TableCell>{asset.type}</TableCell>
//                     <TableCell>{asset.borrower}</TableCell>
//                     <TableCell>{asset.dateBorrowed}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Card>
//         </Grid>

//         {/* Assets by Type (Pie Chart) */}
//         <Grid item xs={12} sm={6}>
//           <Card sx={{ padding: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Assets by Type
//             </Typography>
//             <Pie
//               data={{
//                 labels: assetTypes.map((type) => type.name),
//                 datasets: [
//                   {
//                     data: assetTypes.map((type) => type.count),
//                     backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//                   },
//                 ],
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [borrowedAssets, setBorrowedAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch Pending Requests
//   const fetchPendingRequests = async () => {
//     try {
//         const response = await axios.get("http://localhost:8080/api/requests/pending", {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         console.log("Pending requests:", response.data);
//         setPendingRequests(response.data);
//     } catch (error) {
//         console.error("Error fetching pending requests:", error);
//     }
// };


//   // Fetch Borrowed Assets
//   const fetchBorrowedAssets = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/api/borrowed-assets", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setBorrowedAssets(response.data);
//     } catch (err) {
//       setError("Failed to fetch borrowed assets.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Accept or Reject Request
//   const handleRequestAction = async (requestId, status) => {
//     try {
//       // Update request status
//       await axios.put(
//         `http://localhost:8080/api/requests/${requestId}?status=${status}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // Notify the user
//       const request = pendingRequests.find((req) => req.id === requestId);
//       await axios.post(
//         "http://localhost:8080/api/notifications",
//         {
//           userId: request.userId,
//           message: `Your asset request has been ${status.toLowerCase()}.`,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // If accepted, add to borrowed assets
//       if (status === "Accepted") {
//         await axios.post(
//           "http://localhost:8080/api/borrowed-assets",
//           {
//             assetId: request.assetId,
//             userId: request.userId,
//             borrowDate: new Date().toISOString(),
//             status: "Borrowed",
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//       }

//       // Refresh pending requests and borrowed assets
//       fetchPendingRequests();
//       fetchBorrowedAssets();
//     } catch (err) {
//       console.error(`Failed to ${status.toLowerCase()} request:`, err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingRequests();
//     fetchBorrowedAssets();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Pending Requests Section */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Request ID</th>
//               <th className="py-2 px-4 border-b">Asset Name</th>
//               <th className="py-2 px-4 border-b">Requested By</th>
//               <th className="py-2 px-4 border-b">Request Date</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingRequests.length > 0 ? (
//               pendingRequests.map((request) => (
//                 <tr key={request.id}>
//                   <td className="py-2 px-4 border-b">{request.id}</td>
//                   <td className="py-2 px-4 border-b">{request.assetName}</td>
//                   <td className="py-2 px-4 border-b">{request.userName}</td>
//                   <td className="py-2 px-4 border-b">{request.requestDate}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                       onClick={() => handleRequestAction(request.id, "Accepted")}
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                       onClick={() => handleRequestAction(request.id, "Rejected")}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4">
//                   No pending requests.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Borrowed Assets Section */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Borrowed Assets</h2>
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Borrow ID</th>
//               <th className="py-2 px-4 border-b">Asset Name</th>
//               <th className="py-2 px-4 border-b">Borrowed By</th>
//               <th className="py-2 px-4 border-b">Borrow Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {borrowedAssets.length > 0 ? (
//               borrowedAssets.map((asset) => (
//                 <tr key={asset.id}>
//                   <td className="py-2 px-4 border-b">{asset.id}</td>
//                   <td className="py-2 px-4 border-b">{asset.assetName}</td>
//                   <td className="py-2 px-4 border-b">{asset.userName}</td>
//                   <td className="py-2 px-4 border-b">{asset.borrowDate}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">
//                   No borrowed assets.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [borrowedAssets, setBorrowedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Pending Requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/requests/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Pending requests:", response.data);
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  // Fetch Borrowed Assets
  const fetchBorrowedAssets = async () => {
    try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/borrowed-assets", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setBorrowedAssets(response.data);
    } catch (err) {
        setError("Failed to fetch borrowed assets.");
        console.error(err);
    } finally {
        setLoading(false);
    }
};


  // Handle Accept or Reject Request
  const handleRequestAction = async (requestId, status) => {
    try {
      // Find the request
      const request = pendingRequests.find((req) => req.requestId === requestId);

      // Update request status
      await axios.put(
        `http://localhost:8080/api/requests/${requestId}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Send a notification
      if (request) {
        await axios.post(
          "http://localhost:8080/api/notifications",
          {
            userId: request.userId,
            message: `Your asset request for ${request.assetName} has been ${status.toLowerCase()}.`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      // If accepted, add to borrowed assets
      if (status === "Accepted") {
        await axios.post(
          "http://localhost:8080/api/borrowed-assets",
          {
            assetId: request.assetId,
            userId: request.userId,
            borrowDate: new Date().toISOString(),
            status: "Borrowed",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      // Refresh data
      fetchPendingRequests();
      fetchBorrowedAssets();
    } catch (err) {
      console.error(`Failed to ${status.toLowerCase()} request:`, err);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchBorrowedAssets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pending Requests Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 border">Request ID</th>
              <th className="py-3 px-6 border">Asset Name</th>
              <th className="py-3 px-6 border">Requested By</th>
              <th className="py-3 px-6 border">Request Date</th>
              <th className="py-3 px-6 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <tr key={request.requestId} className="text-center">
                  <td className="py-2 px-4 border">{request.requestId}</td>
                  <td className="py-2 px-4 border">{request.assetName}</td>
                  <td className="py-2 px-4 border">{request.userName}</td>
                  <td className="py-2 px-4 border">{request.requestDate}</td>
                  <td className="py-2 px-4 border">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                      onClick={() => handleRequestAction(request.requestId, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleRequestAction(request.requestId, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Borrowed Assets Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Borrowed Assets</h2>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 border">Borrow ID</th>
              <th className="py-3 px-6 border">Asset Name</th>
              <th className="py-3 px-6 border">Borrowed By</th>
              <th className="py-3 px-6 border">Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedAssets.length > 0 ? (
              borrowedAssets.map((asset) => (
                <tr key={asset.borrowId} className="text-center">
                  <td className="py-2 px-4 border">{asset.borrowId}</td>
                  <td className="py-2 px-4 border">{asset.assetName}</td>
                  <td className="py-2 px-4 border">{asset.userName}</td>
                  <td className="py-2 px-4 border">{asset.borrowDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No borrowed assets.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
