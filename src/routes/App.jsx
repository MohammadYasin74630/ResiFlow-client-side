import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routeLayout";

function App() {

    const router = createBrowserRouter([...routes]);

    return (
        <RouterProvider router={router} />
    )
}

export default App