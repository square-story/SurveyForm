import AdminPage from "@/pages/admin/AdminPage";
import AuthPage from "@/pages/auth/AuthPage";
import LandingPage from "@/pages/landing/LandingPage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRouter";
import { UnProtectedRoute } from "./UnProtectedRoute";
export const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <UnProtectedRoute><AuthPage /></UnProtectedRoute> },
    { path: "/admin", element: <ProtectedRoutes><AdminPage /></ProtectedRoutes> }
]);
