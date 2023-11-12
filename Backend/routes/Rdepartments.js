import express from 'express'
import { addNewDepartment, deleteDepartment, getAllDepartments, getDepartment, updateDepartment } from '../controllers/Cdepartments.js'

const Route = express.Router()

Route.get('/', getAllDepartments)
Route.post('/', addNewDepartment)
Route.get('/:id', getDepartment)
Route.patch('/:id', updateDepartment)
Route.delete('/:id', deleteDepartment)


export default Route