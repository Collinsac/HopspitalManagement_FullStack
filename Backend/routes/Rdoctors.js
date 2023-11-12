import express from "express"
import { addNewdoctor, deleteDoctor, doctorAuth, getAllDoctors, getDepartmentDoctors, getDoctor, updateDoctor } from "../controllers/Cdoctors.js"
const Route = express.Router()

Route.get('/', getAllDoctors)
Route.post('/', addNewdoctor)
Route.get('/:id', getDoctor)
Route.patch('/:id', updateDoctor)
Route.delete('/:id', deleteDoctor)
Route.get('/department/:id', getDepartmentDoctors)
Route.post('/auth', doctorAuth)
export default Route