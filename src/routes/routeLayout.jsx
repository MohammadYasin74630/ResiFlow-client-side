import MainLayout from "../layout/MainLayout";
import { authRoutes } from "./authRoutes";
import mainRoutes from "./mainRoutes";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [...mainRoutes, ...authRoutes]
    }
]

export default routes;