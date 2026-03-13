import '../styles/ExerciseList.css'
import { Header } from '../components/Header'
import { CgAddR } from 'react-icons/cg'
import { useState } from 'react'

export default function ExerciseList() {

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

    function handleAddExercise() {

    }
    return (
        <>
        <Header children={
            <>
                <input className="search-bar" type="text" placeholder="Search exercise, body part, muscle group..." />
                <button className='add-exercise'><CgAddR/></button>
            </>
            
            }/>
        
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