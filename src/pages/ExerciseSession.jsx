import '../styles/ExerciseSession.css'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useEffect, useReducer, useState } from 'react'

function sessionReducer(state, action) {
    switch (action.type) {
        case 'SET_SESSION':
            return action.payload
        default:
            return state
    }
}

export default function ExerciseSession({ Template=[] }) {
    const navigate = useNavigate()
    const [currentSession, dispatch] = useReducer(sessionReducer, [])


    useEffect(() => {
        dispatch({
            type: "SET_SESSION",
            payload: [
                ...Template,
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: 10,
                            reps: 20,
                            finished: true,
                        },
                        {
                            lbs: 140,
                            reps: 10,
                            finished: true,
                        },
                    ]
                },
                {
                    name: "Tricep Pushdown",
                    sets: [
                        {
                            lbs: 10,
                            reps: 20,
                            finished: true,
                        },
                        {
                            lbs: 140,
                            reps: 10,
                            finished: false,
                        },
                    ]
                }
            ]
        })
    }, [])

    useEffect(() => {
        console.log(currentSession)
    }, [currentSession])



    
    return (
        <div className="container">
            {currentSession.map((exercise) => {
                return (
                    <div className="row">
                        <h4>{exercise.name}</h4>
                        <form action="">
                            {exercise.sets.map((set, index) => {
                                 return (
                                    <div key={index} className='set-row'>
                                        <label htmlFor="weight">lbs</label>
                                        <input type="number" onChange={(e) => updateLbs(e)} value={set.lbs} id="weight" />
                                        <label htmlFor="repetition">reps</label>
                                        <input type="number" onChange={(e) => set.reps = updateReps(e)} value={set.reps} id="repetition"/>
                                        <button className='check-btn' type='button'><FaCheck color={set.finished ? "white" : "grey"} size={10}/></button>
                                    </div>
                                 )
                            })}
                           
                        </form>
                        <button  className='add-set-btn'>Add Set</button>
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