import { useContext, useState } from 'react'
import { Header } from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { CgAddR } from 'react-icons/cg'
import '../styles/WorkoutTemplates.css'
import { CurrentSessionContext } from '../contexts/CurrentSession'

export default function WorkoutTemplates() {
    const location = useLocation()
    const {currentSessionContext, setCurrentSessionContext} = useContext(CurrentSessionContext)
    const navigate = useNavigate()
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

    function handleSelectTemplate(index) {
        if (currentSessionContext.startTime) return
        setCurrentSessionContext({...currentSessionContext, currentExercises: templateList[index].exercises})
        navigate('/session')
    }

    return (
        <>
            <Header children={
                        <>
                            {location.pathname === '/session/add-exercise' && <button  onClick={() => navigate(-1)} className='cancel-btn'><GoArrowLeft size={15}/></button>}
                            <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery ? searchQuery : ""} className="search-bar" type="text" placeholder="Search template name..." />
                            <button onClick={() => setAppearModal(true)} className='add-exercise-btn'><CgAddR/></button>
                        </>
                        
                        }/>

            <div key={location.pathname} className='container'>
                {templateList.map((template, index) => {
                    return (
                        <div key={index} onClick={() => handleSelectTemplate(index)} className="template-row">
                            <button className='template-btn'>
                                <h3>{template.name}</h3>
                                <div className='exercise-showcase'>
                                    {template.exercises.map((exercise, index) => {
                                        return (
                                            <div key={index} className='exercise-row'>
                                                <p className='exercise-name'>{exercise.name}</p>
                                                {exercise.sets.map((set, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <p className='lbs-reps'>{set.lbs.length > 0 ? set.lbs : 0} x {set.reps.length > 0 ? set.reps : 0}</p>
                                                        </div>
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