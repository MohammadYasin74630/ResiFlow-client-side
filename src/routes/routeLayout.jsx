import MainLayout from "../layout/MainLayout";
import AuthProvider from "../utils/AuthProvider";
import { authRoutes } from "./authRoutes";
import mainRoutes from "./mainRoutes";

const routes = [
    {
        path: "/",
        element: <AuthProvider> <MainLayout /> </AuthProvider>,
        children: [...mainRoutes, ...authRoutes]
    }
]

export default routes;