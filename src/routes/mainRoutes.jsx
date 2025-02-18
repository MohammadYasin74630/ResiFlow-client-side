import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";

const mainRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/apartments",
        element: <h1>apartments</h1>
    },
    {
        path: "*",
        element: <Error />
    },
]

export default mainRoutes;