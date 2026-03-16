import { useContext } from 'react'
import '../styles/Dashboard.css'
import { Link } from "react-router-dom"
import { CurrentSessionContext } from '../contexts/CurrentSession'

export function Dashboard() {
    const {currentSessionContext, setCurrentSessionContext} = useContext(CurrentSessionContext)
    return (
        <div className='dashboard-container'>
            <Link to="/session">
                <button>{currentSessionContext.startTime ? "Continue Exercise" : "Start Exercise"}</button>
            </Link>

            {currentSessionContext.startTime === undefined && <Link to="/workout-templates">
                <button>Choose Workout Template</button>
            </Link>}    
            
        </div>
    )
}