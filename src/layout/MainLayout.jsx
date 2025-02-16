import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function MainLayout() {
    return (
        <>
            <Navbar />
            <div className="flex-1">
            <Outlet />
            </div>
            <Footer />
            {/* <section className="h-screen"></section> */}
        </>
    )
}

export default MainLayout