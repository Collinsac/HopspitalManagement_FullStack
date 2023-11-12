import express from 'express'
import { addNewDiseases, deleteDisease, getAllDiseases, getDisease, getReportDiseases, updateDisease } from '../controllers/Cdiseases.js'

const Route = express.Router()

Route.get('/', getAllDiseases)
Route.post('/', addNewDiseases)
Route.get('/:id', getDisease)
Route.get('/report/:id', getReportDiseases)
Route.patch('/:id', updateDisease)
Route.delete('/:id', deleteDisease)
export default Route