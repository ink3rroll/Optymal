const BASE_URL = import.meta.env.PROD ? "https://optymal-backend-1.onrender.com" : "http://localhost:3000"

// const BASE_URL = "https://optymal-backend-1.onrender.com"

export const getExercisesApi = async () => {
    const res = await fetch(`${BASE_URL}/exercises`)
    if (!res.ok) throw new Error(`Error fetching data: ${res.status}`)
    return await res.json()
}

export const getCurrentSessionApi = async () => {
    const res = await fetch(`${BASE_URL}/currentsession`)
    if (!res.ok) throw new Error(`Error fetching data: ${res.status}`)
    return await res.json()
}

export const startCurrentSessionApi = async () => {
    try {
        const res = await fetch(`${BASE_URL}/currentsession`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
        })

        if (!res.ok) throw new Error("Unable to start workout session.")

        const data = await res.json()
        return data

    } catch (err) {
        alert("Could not start workout session.")
    }
    
}

export const editCurrentSessionApi = async (currentSession) => {
    console.log("here: ", currentSession)
    try {
        const res = await fetch(`${BASE_URL}/currentsession`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentSession)
        })

        if (!res.ok) throw new Error("Unable to edit current session.")
        
        const data = await res.json()

        return data

    } catch (err) {
        alert("Unable to edit current session.")
    }
    
}

export const postExerciseApi = async (exerciseInfo) => {
    console.log("Im here")
    try {
        const res = await fetch(`${BASE_URL}/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exerciseInfo)
        })

        if (!res.ok) throw new Error('Mali')

        const data = await res.json()
        console.log('Success: ', data)

        return data
    } catch (err) {
        alert("Could not add new exercise: " + err.message)
    }
    
}

export const editExerciseApi = async (id, exerciseInfo) => {
    console.log("Edit Exercise: " + id)

    try {
        const res = await fetch(`${BASE_URL}/exercises/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exerciseInfo)
        })

        if (!res.ok) {
            throw new Error('Mali yan')
        } 

        const data = await res.json()
        return data
    } catch (err) {
        alert("Could not edit the exercise: "+ err.message)
    }
}

export const deleteExerciseApi = async (id) => {
    console.log("Deleting exercise: " + id)

    try {
        const res = await fetch(`${BASE_URL}/exercises/${id}`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            throw new Error('Mali yan')
        } 

        const data = await res.json()

        return data.message
    } catch (err){
        alert('Failed deletion: ' + err.message)
    }
}