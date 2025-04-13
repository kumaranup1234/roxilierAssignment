import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

const ProtectedRoute = ({ children, role }) => {
    const { auth, loading } = useAuth();

    if (loading) return null;

    if (!auth.token || !auth.user) {
        return <Navigate to="/login" replace />;
    }

    if (role && auth.user.role !== role) {
        return Unauthorized;
    }

    return children;
};

const Unauthorized = () => (
    <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">403 - Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
    </div>
);


export default ProtectedRoute;
