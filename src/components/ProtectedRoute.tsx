import { Navigate, useLocation } from "react-router-dom";
import { getSession, canAccessPortal, portalForRole } from "../auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * Wraps a portal page.
 * - No session → redirect to /login, preserving the intended destination.
 * - Wrong role for this URL → redirect to the correct portal for their role.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const session = getSession();

    if (!session) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (!canAccessPortal(location.pathname, session.role)) {
        return <Navigate to={portalForRole(session.role)} replace />;
    }

    return <>{children}</>;
}
