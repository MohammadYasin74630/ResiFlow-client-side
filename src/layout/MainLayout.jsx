import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Toaster } from 'sonner'

function MainLayout() {
    return (
        <>
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
            <Toaster richColors position="top-right" toastOptions={{
                style: {
                    background: 'red',
                },
            }} />
            {/* <section className="h-screen"></section> */}
        </>
    )
}

export default MainLayout