const express = require('express');
const app = express();
app.use(express.json());

// Simulating an in-memory database
let patients = [
    { id: 1, name: "Ana Silva", age: 30, history: "Penicillin allergy" },
    { id: 2, name: "Carlos Souza", age: 45, history: "Hypertension" }
];

// Route to list all patients
app.get('/patients', (req, res) => {
    res.status(200).json(patients);
});

// Route to register a new patient
app.post('/patients', (req, res) => {
    const newPatient = {
        id: patients.length + 1,
        name: req.body.name,
        age: req.body.age,
        history: req.body.history
    };
    patients.push(newPatient);
    res.status(201).json(newPatient);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});