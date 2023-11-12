import express from 'express'
import { addNewAdmin, adminAuth, getAllAdmin } from '../controllers/Cadmin.js'

const Route = express.Router()

Route.get('/', getAllAdmin)
Route.post('/', addNewAdmin)
Route.post('/auth', adminAuth)

export default Route