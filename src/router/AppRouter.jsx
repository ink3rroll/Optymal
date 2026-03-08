import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from '../pages/Dashboard'
import ExerciseList from "../pages/ExerciseList";
import History from "../pages/History";
import WorkoutTemplates from "../pages/WorkoutTemplates";
import MainLayout from "../components/Layout";
import ExerciseSession from "../pages/ExerciseSession";


export function AppRouter() {
    return (
        <>
        
        <BrowserRouter>
        <MainLayout>
            <Routes>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/exercise-list" element={<ExerciseList />}/>
                    <Route path="/workout-templates" element={<WorkoutTemplates />}/>
                    <Route path="/history" element={<History />}/>

                    <Route path="/session" element={<ExerciseSession />}/>
            </Routes>
        </MainLayout>
            
        </BrowserRouter>
        
        </>
    )
}