import { Link } from 'react-router-dom'
import { RiArtboardFill, RiKnifeLine, RiArchive2Line, RiTimeLine } from 'react-icons/ri'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function Navbar() {
    const location = useLocation()
    return (
        <>
            <nav className="navbar">
                <Link to="/"><RiArtboardFill color={location.pathname === "/" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
                <Link to="/exercise-list"><RiKnifeLine color={location.pathname === "/exercise-list" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
                <Link to="/workout-templates"><RiArchive2Line color={location.pathname === "/workout-templates" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
                <Link to="/history"><RiTimeLine color={location.pathname === "/history" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
            </nav>
        </>
    )
}