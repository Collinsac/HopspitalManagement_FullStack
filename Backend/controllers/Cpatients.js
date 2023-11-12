import patientModel from "../models/Mpatients.js"

// ----------------------------------------------------------
// ---------------------------------------------------------


const getAllPatients = async (req, res) => {
    try {
        const allPatients = await patientModel.find()
        res.status(200).json({name:"Patients", value:allPatients})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// ------------------------------------------------------------------

const addNewPatient = async (req, res) => {
    const data = req.body
    const newPatient = new patientModel(data)
    try {
        const Patient = await patientModel.findOne({ email: data.email, DOB: data.DOB})
        if(!Patient) {
            await newPatient.save()
        res.status(201).json(newPatient)
        }
        else{
            res.status(401).json("Patient already exsit")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// --------------------------------------------------------------------

const getPatient = async (req, res) => {
    const { id } = req.params
    try {
        const Patient = await patientModel.findById(id)

        Patient ? res.status(200).json(Patient) : res.status(404).json("Patient not found")

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// --------------------------------------------------------------------------

const updatePatient = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const patient = await patientModel.findByIdAndUpdate(id, data, { new: true })
        patient ? res.status(200).json(patient) : res.status(404).json("Patient not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// -------------------------------------------------------------------------

const patientAuth = async (req, res) => {
    const { email, password } = req.body
    try {
        const Patient = await patientModel.findOne({ email: email })
        if (Patient) {
            Patient.password === password ? res.status(200).json({ id: Patient.id , name:Patient.name}) : res.status(401).json("Worng password")
        }
        else {
            res.status(404).json("Patient does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

// ------------------------------------------------------------------------

const deletePatient = async (req, res) => {
    const { id } = req.params

    try {
        await patientModel.findByIdAndDelete(id)
        res.status(200).json('patient deleted')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllPatients, addNewPatient, getPatient, updatePatient, deletePatient, patientAuth }