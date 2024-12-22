import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddAsset from "./component/AddAsset";
import Body from "./component/Body";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
import "./index.css";
import AvailableAssets from "./pages/AvailableAssets";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterPage from "./component/RegisterForm";
import AssetDetailsPage from "./pages/AssetDetailsPage";
import LoginForm from "./pages/LoginForm";
import UserDashboard from "./component/UserDashboard";
import AuditAsset from "./pages/AuditAsset";
import { AssetProvider } from "./context/AssetContext.js";
import Unauthorized from "./pages/Unauthorized.jsx";



const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// const App = () => {
//   const [role, setRole] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     // Safely fetch token and role from localStorage
//     const storedToken = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");
//     setToken(storedToken);
//     setRole(storedRole);
//   }, []);

// const App = () => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (


    <div className="App">
      <Navbar />
      <Routes>
      {/* Route for Login */}
      <Route path="/login" element={<LoginForm />} />

{/* Conditional Routing Based on Role */}
{token && role === "ADMIN" ? (
  <Route path="/dashboard" element={<Dashboard />} />
) : token && role === "USER" ? (
  <Route path="/userDashboard" element={<UserDashboard />} />
) : (
  <Route path="/" element={<Navigate to="/login" />} />
)}
      {/* {!token ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : role === "Admin" ? (
          <Route path="*" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="*" element={<Navigate to="/userDashboard" />} />
        )} */}
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/available-assets" element={<AvailableAssets />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Body />} />
        <Route path="/assetDetails/:id" element={<AssetDetailsPage />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        
        {/* <Route
          path="/admin-dashboard"
          element={role === "ADMIN" ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-dashboard"
          element={role === "USER" ? <UserDashboard /> : <Navigate to="/login" />}
        />*/}
        <Route path="/auditAsset" element={<AuditAsset />} /> 
      </Routes>
    </div>


  );
}


export default App;