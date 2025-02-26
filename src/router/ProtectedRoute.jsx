import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(authContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;