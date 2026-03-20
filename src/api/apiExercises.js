// const BASE_URL = "http://localhost:3000"

const BASE_URL = "https://optymal-backend.onrender.com"

export const getExercises = async () => {
    const res = await fetch(`${BASE_URL}/exercises`)
    if (!res.ok) throw new Error(`Error fetching data: ${res.status}`)
    return await res.json()
}