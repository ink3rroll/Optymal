import { useContext, useState } from "react"
import { SessionHistoryContext } from "../contexts/SessionHistory"
import { Header } from "../components/Header"
import '../styles/History.css'

export default function History() {
    const {sessionHistoryContext, setSessionHistoryContext} = useContext(SessionHistoryContext)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <>
            <Header children={
                <>
                    <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery ? searchQuery : ""} className="search-bar" type="text" placeholder="Search workout name..." />
                </> 
            }/>

            <div className="container">
                {sessionHistoryContext.length > 0 ? 
                <div className="history-row">
                    {
                        sessionHistoryContext.map((session, i) => {
                            return (
                                <button key={i} className="session-row">
                                    {session.name ?? "Unnamed session"}
                                   
                                        {session.currentExercises.map((exercise, i) => {
                                            return (
                                                 <div key={i} className="session-exercise-row">
                                                    {exercise.name}
                                                    <div className="sets-row">
                                                        {exercise.sets.map((set, i) => {
                                                            return (
                                                                <div key={i} className="set">
                                                                    <div className="lbs-reps">{set.lbs} x {set.reps}</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>    
                                                </div>
                                            )
                                        })}
                                    
                                </button>
                            )
                        })
                    }
                </div> : "No History Available"
            }
                
            </div>
        </>
    )
}