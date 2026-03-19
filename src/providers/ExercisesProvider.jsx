import { useEffect, useState } from "react";
import { ExercisesContext } from "../contexts/Exercises";
import { getExercises } from "../api/apiExercises";

export default function ExercisesProvider({ children }) {
    const [exercisesContext, setExercisesContext] = useState([])
    return (
        <ExercisesContext.Provider value={{ exercisesContext, setExercisesContext }}>
            {children}
        </ExercisesContext.Provider>
    )
}