import express from 'express'
import { addNewAppointment, deleteAppointment, getAllAppointment, getAppointment, getUserAppointment, updateAppointment } from '../controllers/Cappointments.js'
const Route = express.Router()

Route.get('/', getAllAppointment)
Route.post('/', addNewAppointment)
Route.get('/:id', getAppointment)
Route.get('/user/:id', getUserAppointment)
Route.patch('/:id', updateAppointment)
Route.delete('/:id', deleteAppointment)
export default Route