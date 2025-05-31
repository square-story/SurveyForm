import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { IRouteProps } from "./types/IRouteProps";

export const UnProtectedRoute = ({ children }: IRouteProps) => {
    const { isAuthenticated } = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth);

    if (isAuthenticated) {
        return <Navigate to={`/admin`} replace />;
    }

    return <>{children}</>;
}