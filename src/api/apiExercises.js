const BASE_URL = "http://localhost:3000"

// const BASE_URL = "https://optymal-backend-1.onrender.com"

export const getExercises = async () => {
    const res = await fetch(`${BASE_URL}/exercises`)
    if (!res.ok) throw new Error(`Error fetching data: ${res.status}`)
    return await res.json()
}

export const postExercise = async (exercise) => {
    console.log("Im here")
    try {
        const res = await fetch(`${BASE_URL}/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        })

        if (!res.ok) throw new Error('Mali')

        const data = await res.json()
        console.log('Success: ', data)

        return data
    } catch (err) {
        alert("Could not add new exercise: " + err.message)
    }
    
}