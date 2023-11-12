import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        phone: Number,
        email: String,
        password: String,
        DOB: String,
        gender: String,
        departmentId: String,
        address: String,
        Biography: String,
        Designation: String,
        about: String,
    },
    { timestamps: true }
)

const doctorModel = mongoose.model("doctors", doctorSchema)
export default doctorModel