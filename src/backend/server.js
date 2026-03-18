import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://localhost:5173']
}))

app.get('/', (req, res) => {
    res.send("Putanginamo")
})

app.get('/about', (req, res) => {
    res.send('This is the about page.')
})

app.get('/exercises', (req, res) => {
    res.json([
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
})

app.get('/exercises/:name', (req, res) => {
    const name = req.params.name

    const exercises = [
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
    ]

    const requestedExercise = exercises.find((exercise) => exercise.name.toLowerCase() === name.toLowerCase())

    res.json(requestedExercise)
})

app.listen(3000, () => {
    console.log('The server is running')
})