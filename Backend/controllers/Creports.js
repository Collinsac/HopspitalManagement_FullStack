import reportModel from "../models/Mreports.js";

// =====================================================
// =====================================================

const getAllreports = async (req, res) => {
    try {
        const allReports = await reportModel.find()
        res.status(200).json({name:"Reports", value:allReports})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// =====================================================

const addNewReport = async (req, res) => {
    const data = req.body
    const newReport = new reportModel(data)
    try {
        await newReport.save()
        res.status(201).json(newReport)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//==========================================================

const getReport = async (req, res) => {
    const { id } = req.params

    try {
        const Report = await reportModel.findById(id)

        Report ? res.status(200).json(Report) : res.status(404).json("Report not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// =========================================================

const getUserReport = async (req, res) => {
    const { id } = req.params
    try {
        const Report = await reportModel.find({ $or: [{ doctorId: id }, { patientId: id }] })
        Report ? res.status(200).json(Report) : res.status(404).json("Reports not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =============================================================

const updateReport = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const Report = await reportModel.findByIdAndUpdate(id, data, { new: true })
        Report ? res.status(200).json(Report) : res.status(404).json("Report not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ============================================================

const deleteReport = async (req, res) => {
    const { id } = req.params
    try {
        await reportModel.findByIdAndDelete(id)
        res.status(200).json("Report deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllreports, addNewReport, getReport, getUserReport, updateReport, deleteReport }