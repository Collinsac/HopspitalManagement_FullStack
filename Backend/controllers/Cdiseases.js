import diseasesModel from "../models/Mdisease.js";

// ========================================================
// ========================================================

const getAllDiseases = async (req, res) => {
    try {
        const AllDiseases = await diseasesModel.find()
        res.status(200).json(AllDiseases)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// =========================================================


const addNewDiseases = async (req, res) => {
    const data = req.body
    const newDisease = new diseasesModel(data)

    try {
        await newDisease.save()
        res.status(201).json(newDisease)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// ==========================================================

const getDisease = async (req, res) => {
    const { id } = req.params
    try {
        const diseases = await diseasesModel.findById(id)
        diseases ? res.status(200).json(diseases) : res.status(404).json("Disease not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =========================================================


const getReportDiseases = async (req, res) => {
    const { id } = req.params
    try {
        const Disease = await diseasesModel.find({ ReportId: id })
        Disease ? res.status(200).json(Disease) : res.status(404).json("disease not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// ==========================================================

const updateDisease = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const disease = await diseasesModel.findByIdAndUpdate(id, data, { new: true })
        disease ? res.status(200).json(disease) : res.status(404).json("disease not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ==========================================================

const deleteDisease = async (req, res) => {
    const { id } = req.params

    try {
        await diseasesModel.findByIdAndDelete(id)
        res.status(200).json("Disease deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export { getAllDiseases, addNewDiseases, getDisease, getReportDiseases, updateDisease, deleteDisease }