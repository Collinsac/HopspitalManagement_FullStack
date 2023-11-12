import express from 'express'
import { AddNewPhamarcy, deletePhamarcy, getAllPhamarcy, getPhamarcy, phamarcyAuth, updatePhamarcy } from '../controllers/Cphamarcy.js'

const Route = express.Router()

Route.get('/', getAllPhamarcy)
Route.post('/', AddNewPhamarcy)
Route.get('/:id', getPhamarcy)
Route.patch('/:id', updatePhamarcy)
Route.delete('/:id', deletePhamarcy)
Route.post('/auth', phamarcyAuth)

export default Route