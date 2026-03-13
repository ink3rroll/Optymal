import '../styles/ExerciseList.css'
import { Header } from '../components/Header'
import { CgAddR } from 'react-icons/cg'
import { useState } from 'react'

export default function ExerciseList() {
    const [appearModal, setAppearModal] = useState(false)
    const [exerciseAddInfo, setExerciseAddInfo] = useState({name: "", musclePart: "", type: ""})
    const [exercisesList, setExercisesList] = useState([
        {
            name: "Lat Pulldown",
            musclePart: "Back",
            type: "Machine"
        },

        {
            name: "Bench Press",
            musclePart: "Chest",
            type: "Barbell"
        },

        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
        {
            name: "Shoulder Press",
            musclePart: "Shoulders",
            type: "Machine"
        },
        {
            name: "Stiff Leg Deadlift",
            musclePart: "Hamstrings",
            type: "Barbell"
        },
        {
            name: "Wide Grip Rows",
            musclePart: "Upper Back",
            type: "Machine"
        },
        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
    ])

    console.log(exerciseAddInfo)

    function handleAddExercise() {
        if (exerciseAddInfo.name == "" || exerciseAddInfo.musclePart == "" || exerciseAddInfo.type == "") return
        setExercisesList([...exercisesList, {
            name: exerciseAddInfo.name,
            musclePart: exerciseAddInfo.musclePart,
            type: exerciseAddInfo.type
        }])
        setExerciseAddInfo({name: "", musclePart: "", type: ""})
        setAppearModal(false)
    }
    return (
        <>
        <Header children={
            <>
                <input className="search-bar" type="text" placeholder="Search exercise, body part, muscle group..." />
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
        
            <div className="container">
                {exercisesList.map((exercise) => {
                    return (
                        <div className='exercise-row'>
                            <button>
                                <h4>{exercise.name}</h4>
                                <p>{exercise.type} | {exercise.musclePart}</p>
                            </button>
                        </div>
                    )
                })}
                
            </div>
        </>
    )
}