import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default AuthRoute;
