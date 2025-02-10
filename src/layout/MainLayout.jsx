import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Home from "../pages/Home/Home"

function MainLayout() {
    return (
        <>
            <Navbar />
            <Home />
            <Footer />
        </>
    )
}

export default MainLayout