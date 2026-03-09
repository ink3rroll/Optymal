import '../styles/ExerciseSession.css'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useEffect, useReducer, useState } from 'react'

function sessionReducer(state, action) {
    switch (action.type) {
        case 'SET_SESSION':
            return action.payload
        case 'ADD_EXERCISE':
            return [
                ...state,
                {
                    name: action.payload,
                    sets: []
                }
            ]
        case 'ADD_SET': 
            return state.map((exercise, i) => {
                return (
                     i === action.exerciseIndex ? 
                    {
                        ...exercise,
                        sets: [
                            ...exercise.sets,
                            {
                                lbs: "",
                                reps: "",
                                finished: false,
                            }
                        ]
                    }
                 : exercise
                )
            })
        case 'UPDATE_LBS':
            return state.map((exercise, i) => {
                return i === action.exerciseIndex ? (
                    {
                        ...exercise,
                        sets: 
                            exercise.sets.map((set, j) => {
                                return j === action.setIndex ? (
                                    {
                                        ...set,
                                        lbs: action.nextLbs
                                    }
                                    ) : set
                                })
                    }
                    
                ) : exercise
            })

        case 'UPDATE_REPS':
            return state.map((exercise, i) => {
                return i === action.exerciseIndex ? (
                    {
                        ...exercise,
                        sets: 
                            exercise.sets.map((set, j) => {
                                return j === action.setIndex ? (
                                    {
                                        ...set,
                                        reps: action.nextReps
                                    }
                                    ) : set
                                })
                    }
                    
                ) : exercise
            })

        case 'TOGGLE_SET':
            return state.map((exercise, i) => {
                return i === action.exerciseIndex ? (
                    {
                        ...exercise,
                        sets: 
                            exercise.sets.map((set, j) => {
                                return j === action.setIndex ? (
                                    {
                                        ...set,
                                        finished: set.finished ? false : true
                                    }
                                    ) : set
                                })
                    }
                    
                ) : exercise
            })
        default:
            return state
    }
}

export default function ExerciseSession({ Template=[] }) {
    const navigate = useNavigate()
    const [currentSession, dispatch] = useReducer(sessionReducer, [])

    function addExercise() {
        dispatch({
            type: 'ADD_EXERCISE',
            payload: "Lat Pulldown"
        })
    }

    function addSet(index) {
        dispatch({
            type: "ADD_SET",
            exerciseIndex: index
        })
    }

    function updateLbs(e, exerciseIndex, setIndex) {
        if (currentSession[exerciseIndex].sets[setIndex].finished) return
        dispatch({
            type: "UPDATE_LBS",
            exerciseIndex: exerciseIndex,
            setIndex: setIndex,
            nextLbs: e.target.value
        })
    }

    function updateReps(e, exerciseIndex, setIndex) {
        if (currentSession[exerciseIndex].sets[setIndex].finished) return
        dispatch({
            type: "UPDATE_REPS",
            exerciseIndex: exerciseIndex,
            setIndex: setIndex,
            nextReps: e.target.value
        })
    }

    function toggleSet(exerciseIndex, setIndex) {
        if (currentSession[exerciseIndex].sets[setIndex].lbs === "" || currentSession[exerciseIndex].sets[setIndex].reps === "") return
        dispatch({
            type: 'TOGGLE_SET',
            exerciseIndex: exerciseIndex,
            setIndex: setIndex,
        })
    }



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

    return (
        <div className="container">
            {currentSession.map((exercise, i) => {
                return (
                    <div className="row">
                        <h4>{exercise.name}</h4>
                        <form action="">
                            {exercise.sets.map((set, j) => {
                                 return (
                                    <div key={j} className='set-row' style={{ backgroundColor: set.finished ? "#66635a" : "transparent", borderRadius: "2px" }}>
                                        <label htmlFor="weight">lbs</label>
                                        <input type="number" onChange={(e) => updateLbs(e, i, j)} value={set.lbs} id="weight" />
                                        <label htmlFor="repetition">reps</label>
                                        <input type="number" onChange={(e) => updateReps(e, i, j)} value={set.reps} id="repetition"/>
                                        <button onClick={() => toggleSet(i, j)} className='check-btn' type='button'><FaCheck size={12}/></button>
                                    </div>
                                 )
                            })}
                           
                        </form>
                        <button onClick={() => addSet(i)} className='add-set-btn'>Add Set +</button>
                    </div>
                )
            })}
            
            <button  className='add-exercise-btn' onClick={() => addExercise()}>Add Exercise</button>
            <div className='bottom-row'>
                <button>Finish Workout</button>
                <button onClick={() => navigate(-1)}>Discard Session</button>
            </div>
                
                
        </div>
    )
} 