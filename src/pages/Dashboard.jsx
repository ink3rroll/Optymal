import '../styles/Dashboard.css'
import { Link } from "react-router-dom"

export function Dashboard() {
    return (
        <div className='dashboard-container'>
            <Link to="/session">
                <button>Start Exercise</button>
            </Link>
                
            <Link to="/workout-templates">
                <button>Choose Workout Template</button>
            </Link>
        </div>
    )
}