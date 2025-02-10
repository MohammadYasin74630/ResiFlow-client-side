import MainLayout from "../layout/MainLayout";
import mainRoutes from "./mainRoutes";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [...mainRoutes]
    }
]

export default routes;