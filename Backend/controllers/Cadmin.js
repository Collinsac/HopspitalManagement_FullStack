import AdminModel from "../models/Madmin.js"

// ========================================================

const getAllAdmin = async (req, res) => {
    try {
        const AllAdmin = await AdminModel.find()
        res.status(200).json({name:"admin", value:AllAdmin})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// =========================================================

const addNewAdmin = async (req, res) => {
    const data = req.body
    const newAdmin = new AdminModel(data)

    try {

        const admin = await AdminModel.findOne({ email: data.email })
        if (!admin) {
            await newAdmin.save()
            res.status(201).json(newAdmin)
        }
        else {
            res.status(400).json("user already exsist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// ========================================================

const adminAuth = async (req, res) => {
    const { email, password } = req.body
    try {
        const Admin = await AdminModel.findOne({ email: email })
        if (Admin) {
            Admin.password === password ? res.status(200).json({ id: Admin.id, firstName: Admin.firstName, lastName: Admin.lastName }) : res.status(401).json("Worng password")
        }
        else {
            res.status(404).json("Admin does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export { getAllAdmin, addNewAdmin, adminAuth }
