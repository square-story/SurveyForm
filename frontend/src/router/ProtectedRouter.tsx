import { useSelector } from "react-redux";
import type { IRouteProps } from "./types/IRouteProps";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }: IRouteProps) => {
    const { isAuthenticated } = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}