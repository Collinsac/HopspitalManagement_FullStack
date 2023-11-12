import departmentModel from "../models/Mdepartments.js"

// ===================================================================
// ==================================================================

const getAllDepartments = async (req, res) => {

    try {
        const AllDepartments = await departmentModel.find()
        res.status(200).json({name:"Departments", value:AllDepartments})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ============================================================

const addNewDepartment = async (req, res) => {
    const data = req.body
    const newDepartment = new departmentModel(data)

    try {
        await newDepartment.save()
        res.status(201).json(newDepartment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ===============================================================

const getDepartment = async (req, res) => {
    const { id } = req.params
    try {
        const Department = await departmentModel.findById(id)
        Department ? res.status(200).json(Department) : res.status(404).json("Department not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ===========================================================

const updateDepartment = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const department = await departmentModel.findByIdAndUpdate(id, data, { new: true })
        department ? res.status(200).json(department) : res.status(404).json("Department not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ===========================================================

const deleteDepartment = async (req, res) => {
    const { id } = req.params

    try {
        await departmentModel.findByIdAndDelete(id)
        res.status(200).json("Department deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export { getAllDepartments, addNewDepartment, getDepartment, updateDepartment, deleteDepartment }