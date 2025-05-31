import AdminPage from "@/pages/admin/AdminPage";
import AuthPage from "@/pages/auth/AuthPage";
import LandingPage from "@/pages/landing/LandingPage";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <AuthPage /> },
    { path: "/admin", element: <AdminPage /> }
]);
