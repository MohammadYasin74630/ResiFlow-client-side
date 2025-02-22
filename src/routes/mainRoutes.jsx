import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Apartments from "../pages/Apartments/Apartments";

const mainRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/apartments",
        element: <Apartments />
    },
    {
        path: "*",
        element: <Error />
    },
]

export default mainRoutes;