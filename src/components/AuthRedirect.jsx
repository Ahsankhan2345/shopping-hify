import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  if (userInfo) {
    // agar user already logged in hai to products page ya home pe bhej do
    return <Navigate to="/products" replace />;
  }
  return children;
};

export default AuthRedirect;
