import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Toaster } from 'sonner'

function MainLayout() {
    return (
        <>
            <Navbar />
            <div className="flex-1 relative">
                <Outlet />
            </div>
            <Footer />
            <Toaster richColors position="top-right"/>
            {/* <section className="h-screen"></section> */}
        </>
    )
}

export default MainLayout