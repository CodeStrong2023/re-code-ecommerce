import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user || !user.isAdmin) {
    return <Navigate to="/home" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
