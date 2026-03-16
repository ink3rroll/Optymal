import '../styles/ExerciseList.css'
import { Header } from '../components/Header'
import { CgAddR } from 'react-icons/cg'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CurrentSessionContext } from '../contexts/CurrentSession'
import { GoArrowLeft } from 'react-icons/go'
import { ExercisesContext } from '../contexts/Exercises'

export default function ExerciseList() {
    const {exercisesContext, setExercisesContext} = useContext(ExercisesContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [appearModal, setAppearModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [filteredList, setFilteredList] = useState(null)
    const { currentSessionContext, setCurrentSessionContext } = useContext(CurrentSessionContext)
    const [exerciseAddInfo, setExerciseAddInfo] = useState({name: "", musclePart: "", type: ""})
    const [exercisesList, setExercisesList] = useState([...exercisesContext])

    function addExercise(exercise) {
        if (location.pathname !== "/session/add-exercise" || !currentSessionContext) return

        setCurrentSessionContext(prev => {
            const exercises = prev.currentExercises || []

            return {
                ...prev,
                currentExercises: [
                    ...exercises,
                    {
                    name: exercise.name,
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                }
                ]
            }
        })
        navigate("/session")
    }

    

    function handleAddExercise() {
        if (exerciseAddInfo.name == "" || exerciseAddInfo.musclePart == "" || exerciseAddInfo.type == "") return
        setExercisesList(prev => [...prev, {
            name: exerciseAddInfo.name,
            musclePart: exerciseAddInfo.musclePart,
            type: exerciseAddInfo.type
        }])
        setExerciseAddInfo({name: "", musclePart: "", type: ""})
        setAppearModal(false)
    }

    useEffect(() => {
        if (searchQuery === null) return
        setFilteredList(exercisesList.filter((exercise) => {
            return exercise.name?.toLowerCase().includes(searchQuery.toLowerCase()) || exercise.musclePart?.toLowerCase().includes(searchQuery.toLowerCase()) || exercise.type?.toLowerCase().includes(searchQuery.toLowerCase())
        })) 
    }, [searchQuery, exercisesList])


    useEffect(() => {
        setExercisesContext([...exercisesList])
    }, [exercisesList])


    return (
        <>
        <Header children={
            <>
                {location.pathname === '/session/add-exercise' && <button  onClick={() => navigate(-1)} className='cancel-btn'><GoArrowLeft size={15}/></button>}
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery ? searchQuery : ""} className="search-bar" type="text" placeholder="Search exercise, body part, muscle group..." />
                <button onClick={() => setAppearModal(true)} className='add-exercise-btn'><CgAddR/></button>
            </>
            
            }/>

            { appearModal && (
                <>
                    <div className='add-exercise-modal' onClick={() => setAppearModal(false)}>
                        <div className='form' onClick={(e) => e.stopPropagation()}>
                            <label htmlFor="name">Exercise Name</label>
                            <input value={exerciseAddInfo.name} onChange={(e) => setExerciseAddInfo({...exerciseAddInfo, name: e.target.value})} id="name" type="text" placeholder='Exercise name (eg. Bench Press)' />
                            <label htmlFor="name">Muscle Part</label>
                            <input value={exerciseAddInfo.musclePart} onChange={(e) => setExerciseAddInfo({...exerciseAddInfo, musclePart: e.target.value})} id="muscle-part" type="text" placeholder='Muscle part (eg. Chest, Back, etc.)'/>
                            <label htmlFor="name">Type</label>
                            <input value={exerciseAddInfo.type} onChange={(e) => setExerciseAddInfo({...exerciseAddInfo, type: e.target.value})} id="type" type="text" placeholder='Type (eg. Machine, Barbell)'/>
                            <button onClick={() => handleAddExercise()} className='confirm-add' disabled={exerciseAddInfo.name == "" || exerciseAddInfo.musclePart == "" || exerciseAddInfo.type == ""} >Add Exercise</button>
                            <button  onClick={() => setAppearModal(false)}>Cancel</button>
                        </div>
                    </div>
                </>
            ) }
        
            <div style={{ paddingBottom: location.pathname !== "/session/add-exercise" && '3.5em' }} className="container">
                { filteredList === null || searchQuery.length === 0 ? exercisesList.length > 0 ? exercisesList.map((exercise, i) => {
                    return (
                        <div key={i} className='exercise-row'>
                            <button onClick={() => addExercise(exercise)} disabled={location.pathname === "/exercise-list"}>
                                <h4>{exercise.name}</h4>
                                <p>{exercise.type} | {exercise.musclePart}</p>
                            </button>
                        </div>
                    )
                }) : <div style={{ display: 'flex', textAlign: 'center', minHeight: '200px', alignItems: 'center', alignSelf: 'center' }}>No exercises</div> : (
                    filteredList.length > 0 ?
                    filteredList.map((exercise, i) => {
                    return (
                        <div key={i} className='exercise-row'>
                            <button onClick={() => addExercise(exercise)} disabled={location.pathname === "/exercise-list"}>
                                <h4>{exercise.name}</h4>
                                <p>{exercise.type} | {exercise.musclePart}</p>
                            </button>
                        </div>
                    )
                }) : <div style={{ display: 'flex', textAlign: 'center', minHeight: '200px', alignItems: 'center', alignSelf: 'center' }}>No exercise found for '{searchQuery}'</div>
                )
                }
                
            </div>
        </>
    )
}