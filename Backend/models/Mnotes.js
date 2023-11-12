import mongoose from "mongoose";
const noteSchema = mongoose.Schema({
    diseaseId: String,
    Discription: String,

}, { timestamps: true })

const notesModel = mongoose.model("notes", noteSchema)
export default notesModel