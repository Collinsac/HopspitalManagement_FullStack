import notesModel from "../models/Mnotes.js";

// =================================================================
// =================================================================


const getAllNotes = async (req, res) => {
    try {
        const AllNotes = await notesModel.find()
        res.status(200).json(AllNotes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// =================================================================


const addNewNote = async (req, res) => {
    const data = req.body
    const newNote = new notesModel(data)

    try {
        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =============================================================

const getNote = async (req, res) => {
    const { id } = req.params
    try {
        const Note = await notesModel.findById(id)
        Note ? res.status(200).json(Note) : res.status(404).json("Note not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =============================================================

const getDiseaseNotes = async (req, res) => {
    const { id } = req.params

    try {
        const Notes = await notesModel.find({ diseaseId: id })
        Notes ? res.status(200).json(Notes) : res.status(404).json("Notes not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ==============================================================

const updateNote = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const Note = await notesModel.findByIdAndUpdate(id, data, { new: true })
        Note ? res.status(200).json(Note) : res.status(404).json("Note not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ===============================================================

const deleteNote = async (req, res) => {
    const { id } = req.params

    try {
        await notesModel.findByIdAndDelete(id)
        res.status(200).json("Note deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllNotes, addNewNote, getNote, getDiseaseNotes, updateNote, deleteNote }