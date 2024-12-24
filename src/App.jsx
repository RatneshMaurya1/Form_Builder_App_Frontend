import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/LandingPage/Landing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectRoute";
import { useAuth } from "./components/Context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const DefaultRoute = () => {
    const { isLoggedIn } = useAuth()

   
  
    return isLoggedIn ? <Navigate to={`/dashboard/${localStorage.getItem("userId")}`} replace /> : <Navigate to="/landing" replace />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultRoute/>} />
          <Route path="/landing" element={<Landing/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
