import { Navigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
