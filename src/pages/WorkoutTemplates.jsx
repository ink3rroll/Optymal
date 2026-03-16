import { useState } from 'react'
import { Header } from '../components/Header'
import { useLocation } from 'react-router-dom'
import { CgAddR } from 'react-icons/cg'
import '../styles/WorkoutTemplates.css'

export default function WorkoutTemplates() {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')
    const [appearModal, setAppearModal] = useState(false)
    const [templateList, setTemplateList] = useState([
        {
            name: "Upper",
            exercises: [
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                }
            ]
        },
        {
            name: "Lower",
            exercises: [
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                }
            ]
        },
        {
            name: "Full body",
            exercises: [
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                }
            ]
        },
        {
            name: "Back",
            exercises: [
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                },
                {
                    name: "Bench Press",
                    sets: [
                        {
                            lbs: "",
                            reps: ""
                        }
                    ]
                }
            ]
        }
    ])
    return (
        <>
            <Header children={
                        <>
                            {location.pathname === '/session/add-exercise' && <button  onClick={() => navigate(-1)} className='cancel-btn'><GoArrowLeft size={15}/></button>}
                            <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery ? searchQuery : ""} className="search-bar" type="text" placeholder="Search template name..." />
                            <button onClick={() => setAppearModal(true)} className='add-exercise-btn'><CgAddR/></button>
                        </>
                        
                        }/>

            <div className='container'>
                {templateList.map((template) => {
                    return (
                        <div className="template-row">
                            <button className='template-btn'>
                                <h3>{template.name}</h3>
                                <div className='exercise-showcase'>
                                    {template.exercises.map((exercise) => {
                                        return (
                                            <div className='exercise-row'>
                                                <p className='exercise-name'>{exercise.name}</p>
                                                {exercise.sets.map((set) => {
                                                    return (
                                                        <>
                                                            <p className='lbs-reps'>lbs: {set.lbs.length > 0 ? set.lbs : 0}</p>
                                                            <p className='lbs-reps'>reps: {set.reps.length > 0 ? set.reps : 0}</p>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            
                                        )
                                    })}
                                </div>
                            </button>
                        </div>
                    )
                })}
                        
            </div>
        </>
    )
}