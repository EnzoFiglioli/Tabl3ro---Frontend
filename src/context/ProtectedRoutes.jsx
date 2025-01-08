import { Navigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export const ProtectedRoute = ({ children }) => {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
