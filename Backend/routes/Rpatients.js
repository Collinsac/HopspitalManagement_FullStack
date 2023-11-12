import express from "express"
import { addNewPatient, deletePatient, getAllPatients, getPatient, patientAuth, updatePatient } from "../controllers/Cpatients.js"
const Route = express.Router()

Route.get('/', getAllPatients)
Route.post('/', addNewPatient)
Route.get('/:id', getPatient)
Route.patch('/:id', updatePatient)
Route.delete('/:id', deletePatient)
Route.post('/auth', patientAuth)

export default Route