import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <div className="flex-1">
                <Outlet />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>

    )
}

export default MainLayout