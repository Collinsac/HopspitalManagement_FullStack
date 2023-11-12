import express from 'express'
import { addNewNote, deleteNote, getAllNotes, getDiseaseNotes, getNote, updateNote } from '../controllers/Cnotes.js'

const Route = express.Router()

Route.get('/', getAllNotes)
Route.post('/', addNewNote)
Route.get('/:id', getNote)
Route.get('/disease/:id', getDiseaseNotes)
Route.patch('/:id', updateNote)
Route.delete('/:id', deleteNote)

export default Route