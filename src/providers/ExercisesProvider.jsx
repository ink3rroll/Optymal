import { useState } from "react";
import { ExercisesContext } from "../contexts/Exercises";

export default function ExercisesProvider({ children }) {
    const [exercisesContext, setExercisesContext] = useState([
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
    return (
        <ExercisesContext.Provider value={{ exercisesContext, setExercisesContext }}>
            {children}
        </ExercisesContext.Provider>
    )
}