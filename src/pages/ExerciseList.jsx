import '../styles/ExerciseList.css'
import { Header } from '../components/Header'
import { CgAddR } from 'react-icons/cg'

export default function ExerciseList() {
    return (
        <>
        <Header children={
            <>
                <input className="search-bar" type="text" placeholder="Search exercise, body part, muscle group..." />
                <button className='add-exercise'><CgAddR/></button>
            </>
            
            }/>
        
            <div className="container">
                <div className='exercise-row'>
                    <button>
                        <h4>Lat Pulldown</h4>
                        <p>Back | Machine</p>
                    </button>
                </div>
            </div>
        </>
    )
}