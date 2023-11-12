import doctorModel from "../models/Mdoctors.js"

// --------------------------------------------------------
// --------------------------------------------------------


const getAllDoctors = async (req, res) => {
    try {
        const allDoctors = await doctorModel.find()
        res.status(200).json({name:"Doctors", value:allDoctors})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// ---------------------------------------------------------

const addNewdoctor = async (req, res) => {
    const data = req.body
    const newDoctor = new doctorModel(data)

    try {
        await newDoctor.save()
        res.status(201).json(newDoctor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//--------------------------------------------------------------

const getDoctor = async (req, res) => {
    const { id } = req.params
    try {
        const Doctor = await doctorModel.findById(id)
        Doctor ? res.status(200).json(Doctor) : res.status(404).json("Doctor not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// -------------------------------------------------------------
const getDepartmentDoctors = async (req, res) => {
    const { id } = req.params
    try {
        const Doctors = await doctorModel.find({ departmentId: id })
        Doctors ? res.status(200).json(Doctors) : res.status(404).json("Doctors not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// -------------------------------------------------------------

const updateDoctor = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const doctor = await doctorModel.findByIdAndUpdate(id, data, { new: true })
        doctor ? res.status(200).json(doctor) : res.status(404).json("doctor not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ------------------------------------------------------------

const deleteDoctor = async (req, res) => {
    const { id } = req.params

    try {
        await doctorModel.findByIdAndDelete(id)
        res.status(200).json("Doctor deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ----------------------------------------------------------

const doctorAuth = async (req, res) => {
    const { email, password } = req.body
    try {
        const doctor = await doctorModel.findOne({ email: email })
        if (doctor) {
            doctor.password === password ? res.status(200).json({ id: doctor.id , firstName: doctor.firstName, lastName: doctor.lastName }) : res.status(401).json("Worng password")
        }
        else {
            res.status(404).json("doctor does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export { getAllDoctors, addNewdoctor, getDoctor, updateDoctor, deleteDoctor, getDepartmentDoctors, doctorAuth }