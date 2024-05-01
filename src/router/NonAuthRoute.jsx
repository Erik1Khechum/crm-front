import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NonAuthRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={"/people"} state={{ from: location }} />;
  }
  return children;
};

export default NonAuthRoute;
