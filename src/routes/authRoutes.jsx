import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const authRoutes = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/forgot-password",
        element: <h1>forgot password !</h1>
    },
]