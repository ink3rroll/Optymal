import '../styles/ExerciseList.css'
import { Header } from '../components/Header'
import { CgAddR } from 'react-icons/cg'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CurrentSessionContext } from '../contexts/CurrentSession'
import { GoArrowLeft } from 'react-icons/go'
import { ExercisesContext } from '../contexts/Exercises'
import { CgTrash } from 'react-icons/cg'
import { FaRegEdit } from 'react-icons/fa'
import useConfirm from '../hooks/Confirm'
import { getExercises, postExercise } from '../api/apiExercises'

export default function ExerciseList() {
    const {exercisesContext, setExercisesContext} = useContext(ExercisesContext)
    const location = useLocation()
    const navigate = useNavigate()
    const { confirm, ConfirmDialog } = useConfirm()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [errorFetching, setErrorFetching] = useState(false)
    const [appearModal, setAppearModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [filteredList, setFilteredList] = useState(null)
    const { currentSessionContext, setCurrentSessionContext } = useContext(CurrentSessionContext)
    const [exerciseAddInfo, setExerciseAddInfo] = useState({name: "", musclePart: "", type: ""})
    const [editExerciseIndex, setEditExerciseIndex] = useState(null)

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

    async function refetch() {
        console.log('refetching')
        setLoadingDialog(true)
            try {
                const data = await getExercises()
                console.log(data)

                setExercisesContext(data)
            } catch (err) {
                throw new Error("Failed fetchaasfaeef")
            } finally {
                setLoadingDialog(false)
            }
        }

    

    async function handleAddUpdateExercise(e) {
        e.preventDefault()

        if (exerciseAddInfo.name == "" || exerciseAddInfo.musclePart == "" || exerciseAddInfo.type == "") return

        if (editExerciseIndex === null) {
            console.log("Hello?", exerciseAddInfo)

            const created = await postExercise(exerciseAddInfo)

            setExercisesContext(prev=> [...prev, created.data])

            console.log('returns what:'+ JSON.stringify(created))

            if (created.data) refetch()
        } else {
            setExercisesContext(prev => 
                prev.map((item, i) => i === editExerciseIndex ? exerciseAddInfo : item)
            )
        }
        
        setExerciseAddInfo({name: "", musclePart: "", type: ""})
        setEditExerciseIndex(null)
        setAppearModal(false)
    }

    async function deleteExercise(index) {
        const ok = await confirm("Are sure you want to delete this exercise? ")

        if (!ok) return

        setExercisesContext(exercisesContext.filter((exercise, i) => i !== index))
    }

    

    function editExercise(index) {
        setEditExerciseIndex(index)
        setExerciseAddInfo({name: exercisesContext[index].name, musclePart: exercisesContext[index].musclePart, type: exercisesContext[index].type})
        setAppearModal(true)
    }

    useEffect(() => {
        if (exercisesContext.length > 0) return
        refetch()
    }, [])


    useEffect(() => {
        if (searchQuery === null) return
        setFilteredList(exercisesContext.filter((exercise) => {
            return exercise.name?.toLowerCase().includes(searchQuery.toLowerCase()) || exercise.musclePart?.toLowerCase().includes(searchQuery.toLowerCase()) || exercise.type?.toLowerCase().includes(searchQuery.toLowerCase())
        })) 
    }, [searchQuery, exercisesContext])


    // useEffect(() => {
    //     setExercisesContext([...exercisesList])
    // }, [exercisesList])

    useEffect(() => {
        if(appearModal) return
        setEditExerciseIndex(null)
        setExerciseAddInfo({name: "", musclePart: "", type: ""})
    }, [appearModal])



    return (
        <>
        <Header children={
            <>
                {location.pathname === '/session/add-exercise' && <button  onClick={() => navigate(-1)} className='cancel-btn'><GoArrowLeft size={15}/></button>}
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery ? searchQuery : ""} className="search-bar" type="text" placeholder="Search exercise, body part, muscle group..." />
                <button onClick={() => setAppearModal(true)} className='add-exercise-btn'><CgAddR/></button>
            </>
            
            }/>

            {ConfirmDialog}

            { appearModal && (
                <>
                    <div className='add-exercise-modal' onClick={() => setAppearModal(false)}>
                        <div className='form' onClick={(e) => e.stopPropagation()}>
                            <form action="" onSubmit={(e) => handleAddUpdateExercise(e)}>
                                <label htmlFor="name">Exercise Name</label>
                                <input value={exerciseAddInfo.name} onChange={(e) => setExerciseAddInfo({...exerciseAddInfo, name: e.target.value})} id="name" type="text" placeholder='Exercise name (eg. Bench Press)' />
                                <label htmlFor="name">Muscle Part</label>
                                <input value={exerciseAddInfo.musclePart} onChange={(e) => setExerciseAddInfo({...exerciseAddInfo, musclePart: e.target.value})} id="muscle-part" type="text" placeholder='Muscle part (eg. Chest, Back, etc.)'/>
                                <label htmlFor="name">Type</label>
                                <input value={exerciseAddInfo.type} onChange={(e) => setExerciseAddInfo({...exerciseAddInfo, type: e.target.value})} id="type" type="text" placeholder='Type (eg. Machine, Barbell)'/>
                                <button type='submit' className='confirm-add' disabled={ JSON.stringify(exerciseAddInfo) === JSON.stringify(exercisesContext[editExerciseIndex]) || exerciseAddInfo.name == "" || exerciseAddInfo.musclePart == "" || exerciseAddInfo.type == ""} >{editExerciseIndex !== null ? 'Update Exercise' : "Add Exercise"}</button>
                                <button type='button'  onClick={() => setAppearModal(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </>
            ) }
        
            <div key={location.pathname} style={{ paddingBottom: location.pathname !== "/session/add-exercise" ? '3.5em' : '0' }} className="container">
                { filteredList === null || searchQuery.length === 0 ? exercisesContext.length > 0 ? exercisesContext.map((exercise, i) => {
                    return (
                        <div key={i} className='exercise-row'>
                             
                            <button onClick={() => addExercise(exercise)} disabled={location.pathname === "/exercise-list"}>
                                <h4>{exercise.name}
                                </h4>
                                <p>{exercise.type} | {exercise.musclePart}</p>
                                
                            </button>
                            <div className='actions'>
                                        <button onClick={() => editExercise(i)}><FaRegEdit size={15}/></button>
                                        <button onClick={() => deleteExercise(i)}><CgTrash color='rgb(211, 111, 111)' size={18}/></button>
                            </div>
                        </div>
                    )
                }) : <div style={{ display: 'flex', textAlign: 'center', minHeight: '200px', alignItems: 'center', alignSelf: 'center' }}>{loadingDialog ? 'Loading data...' : "<button onClick={() => refetch()}>Retry</button>"} </div> : (
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