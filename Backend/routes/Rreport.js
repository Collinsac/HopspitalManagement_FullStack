import express from "express";
import { addNewReport, deleteReport, getAllreports, getReport, getUserReport, updateReport } from "../controllers/Creports.js";

const Route = express.Router()

Route.get('/', getAllreports)
Route.post('/', addNewReport)
Route.get('/:id', getReport)
Route.get('/user/:id', getUserReport)
Route.patch('/:id', updateReport)
Route.delete('/:id', deleteReport)
export default Route