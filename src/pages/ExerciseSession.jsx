import '../styles/ExerciseSession.css'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function ExerciseSession({ Template=[] }) {
    const navigate = useNavigate()
    const [currentSession, setCurrentSession] = useState([])
    useEffect(() => {
        setCurrentSession([
        {
            name: "Bench Press",
            sets: [
                {
                    lbs: 10,
                    reps: 20,
                    finished: false,
                },
                {
                    lbs: 140,
                    reps: 10,
                    finished: false,
                },
            ]
        }
    ])
    }, [])

    
    return (
        <div className="container">
            {currentSession.map((exercise) => {
                return (
                    <div className="row">
                        <h4>{exercise.name}</h4>
                        <form action="">
                            <label htmlFor="weight">lbs</label>
                            <input type="number" value={exercise.sets[0].lbs} id="weight" />
                            <label htmlFor="repetition">reps</label>
                            <input type="number" value={exercise.sets[0].reps} id="repetition"/>
                            <button onFocus={exercise.sets[0].finished} className='check-btn' type='button'><FaCheck size={10}/></button>
                        </form>
                        <button className='add-set-btn'>Add Set</button>
                    </div>
                )
            })}
            
            <button>Add Exercise</button>
            <div className='bottom-row'>
                <button>Finish Workout</button>
                <button onClick={() => navigate(-1)}>Discard Session</button>
            </div>
                
                
        </div>
    )
} 