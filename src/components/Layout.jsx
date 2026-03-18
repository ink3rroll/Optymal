import { useLocation } from "react-router-dom"
import Navbar from "./NavBar"
import '../styles/Layout.css'

export default function MainLayout({ children }) {
    const location = useLocation()
    const appearNavBarPaths = ["/", "/exercise-list", "/workout-templates", "/history"]

    const appearNavBar = appearNavBarPaths.includes(location.pathname)

    return (
        <>
            {appearNavBar && <Navbar />}
            <main>{children}</main>
        </>
    )
}