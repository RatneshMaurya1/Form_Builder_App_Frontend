import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/LandingPage/Landing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectRoute";
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import { Navigate } from "react-router-dom";
import ShareDashboard from "./Pages/ShareDashboard/ShareDashboard";
import AddByLink from "./Pages/AddByLink";
import Setting from "./Pages/Setting/Setting";
import CreateForm from "./Pages/CreateForm/CreateForm";
import FillForm from "./Pages/FillForm/FillForm";

function App() {
  const [count, setCount] = useState(0);
  const DefaultRoute = () => {
    const { isLoggedIn } = useAuth()

   
  
    return isLoggedIn ? <Navigate to={`/dashboard/${localStorage.getItem("userId")}`} replace /> : <Navigate to="/landing" replace />;
  };

  return (
    <>
    <AuthProvider>
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
          <Route path="/share/workspace/:id" element={<ProtectedRoute><ShareDashboard/></ProtectedRoute>}/>
          <Route path="/share/dashboard/:id" element={<ProtectedRoute><AddByLink/></ProtectedRoute>}/>
          <Route path="/setting/:id" element={<ProtectedRoute><Setting/></ProtectedRoute>} />
          <Route path="/create/form/:id" element={<ProtectedRoute><CreateForm/></ProtectedRoute>} />
          <Route path="/fill/form/:id" element={<FillForm/>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;

