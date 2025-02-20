import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import AuthProvider from "../utils/AuthProvider";
import { authRoutes } from "./authRoutes";
import mainRoutes from "./mainRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";

const routes = [
    {
        path: "/",
        element: <AuthProvider> <MainLayout /> </AuthProvider>,
        children: [...mainRoutes, ...authRoutes]
    },
    {
        path: "dashboard",
        element: <AuthProvider> <PrivateRoute> <DashboardLayout /> </PrivateRoute> </AuthProvider>,
        children: [...dashboardRoutes]
    }
]

export default routes;