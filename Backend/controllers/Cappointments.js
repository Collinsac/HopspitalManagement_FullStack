import appointmentModel from "../models/Mappointment.js";

// =====================================================
// =====================================================

const getAllAppointment = async (req, res) => {
    try {
        const allAppointments = await appointmentModel.find()
        res.status(200).json({name:"Appointment", value:allAppointments})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// =====================================================

const addNewAppointment = async (req, res) => {
    const data = req.body
    const newAppointment = new appointmentModel(data)
    try {
        await newAppointment.save()
        res.status(201).json(newAppointment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =======================================================

const getAppointment = async (req, res) => {
    const { id } = req.params
    try {
        const Appointment = await appointmentModel.findById(id)
        Appointment ? res.status(200).json(Appointment) : res.status(404).json("Appointment not Found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// ========================================================

const getUserAppointment = async (req, res) => {
    const { id } = req.params
    try {
        const Appointment = await appointmentModel.find({ $or: [{ doctorId: id }, { patientId: id }] })
        Appointment ? res.status(200).json(Appointment) : res.status(404).json("Appointment not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =============================================================

const updateAppointment = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const appointment = await appointmentModel.findByIdAndUpdate(id, data, { new: true })
        appointment ? res.status(200).json(appointment) : res.status(404).json("appointment not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ===============================================================

const deleteAppointment = async (req, res) => {
    const { id } = req.params

    try {
        await appointmentModel.findByIdAndDelete(id)
        res.status(200).json("Appointment deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export { getAllAppointment, addNewAppointment, getAppointment, getUserAppointment, updateAppointment, deleteAppointment }