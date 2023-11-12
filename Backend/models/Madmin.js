import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number,
    gender: String,
    DOB: String,
    address: String,
    Biography: String,
    about: String,
}, { timestamps: true })

const AdminModel = mongoose.model('Admins', AdminSchema)
export default AdminModel