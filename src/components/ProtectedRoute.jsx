// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
