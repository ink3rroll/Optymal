import { Link } from 'react-router-dom'
import { RiArtboardFill, RiKnifeLine, RiArchive2Line, RiTimeLine } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/NavBar.css'
import { useContext, useEffect, useState } from 'react'
import { CurrentSessionContext } from '../contexts/CurrentSession'
import { HiArrowCircleRight } from 'react-icons/hi'
export default function Navbar() {
    const {currentSessionContext, setCurrentSessionContext} = useContext(CurrentSessionContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [currentTimer, setCurrentTimer] = useState(Date.now() - currentSessionContext.startTime)

    function formatDuration(totalSeconds) {
        totalSeconds = Math.floor(totalSeconds);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return hours === 0 ? `${formattedMinutes}:${formattedSeconds}` : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        if (!currentSessionContext.startTime) return
        let interval = null

        interval = setInterval(() => {
            setCurrentTimer(Date.now() - currentSessionContext.startTime)
        }, 1000)
    }, [currentSessionContext.startTime])

    return (
        <>
            <div className='bottom'>
                {currentSessionContext.startTime && <button onClick={() => navigate('/session')} className='continue-btn'>Continue workout: {formatDuration((currentTimer)/1000)} <HiArrowCircleRight size={25} /></button>}
                <nav className="navbar">
                    <Link className='nav-link' to="/"><RiArtboardFill color={location.pathname === "/" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
                    <Link className='nav-link' to="/exercise-list"><RiKnifeLine color={location.pathname === "/exercise-list" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
                    <Link className='nav-link' to="/workout-templates"><RiArchive2Line color={location.pathname === "/workout-templates" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
                    <Link className='nav-link' to="/history"><RiTimeLine color={location.pathname === "/history" ? "#b3e5e8" : "grey"} size="1.5em"/></Link>
            </nav>
            </div>
        </>
    )
}