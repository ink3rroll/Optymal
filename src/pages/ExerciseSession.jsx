import '../styles/ExerciseSession.css'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { CgTrash } from 'react-icons/cg'
import { useContext, useEffect, useReducer, useState } from 'react'
import useConfirm from '../hooks/Confirm'
import checksound from '../assets/checksound.mp3'
import { CurrentSessionContext } from '../contexts/CurrentSession'
import { GoChevronDown } from 'react-icons/go'

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

        case 'DELETE_EXERCISE':
            return state.filter((exercise, i) => i !== action.exerciseIndex)
        default:
            return state
    }
}

export default function ExerciseSession({ Template=[] }) {
    const check = new Audio(checksound)
    const navigate = useNavigate()
    const { confirm, ConfirmDialog } = useConfirm()
    const [currentSession, dispatch] = useReducer(sessionReducer, [])
    const {currentSessionContext, setCurrentSessionContext} = useContext(CurrentSessionContext)

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
            exerciseIndex,
            setIndex,
            nextLbs: e.target.value
        })
    }

    function updateReps(e, exerciseIndex, setIndex) {
        if (currentSession[exerciseIndex].sets[setIndex].finished) return
        dispatch({
            type: "UPDATE_REPS",
            exerciseIndex,
            setIndex,
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
        if (!currentSession[exerciseIndex].sets[setIndex].finished) check.play()
    }

    async function deleteExercise(index) {
        const ok = await confirm("Are you sure you want to delete this exercise? ")

        if (!ok) return
        
        dispatch({
            type: 'DELETE_EXERCISE',
            exerciseIndex: index
            }) 
    }

    async function handleDiscardSession() {
        const ok = await confirm("Are you sure you want to discard this session?")

        if (!ok) return

        dispatch({
            type: "SET_SESSION",
            payload: [
                
            ]
        })
        navigate(-1)
        
    }



    useEffect(() => {
        dispatch({
            type: "SET_SESSION",
            payload: [
                ...Template,
                ...currentSessionContext
            ]
        })
    }, [])

    useEffect(() => {
        setCurrentSessionContext(currentSession)
    }, [currentSession])


    return (
        <>
            <div className='header'>
                    <button className='minimize-session'><GoChevronDown size={15}/></button>
                    <p>3:40</p>
                </div>
            <div className="container">
                {ConfirmDialog}
                
                
                {currentSession.map((exercise, i) => {
                    return (
                        <div className="row">
                            <div className='exercise-heading'>
                                <h4>{exercise.name}</h4>
                                <button onClick={() => deleteExercise(i)} className='delete-exercise'><CgTrash /></button>
                            </div>
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
                    <button onClick={() => handleDiscardSession()}>Discard Session</button>
                </div>
                    
                    
            </div>
        </>
        
    )
} 