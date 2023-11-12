import mongoose from "mongoose";

const phamarcySchema = mongoose.Schema(
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
    }, { timestamps: true }
)

const phamarcyModel = mongoose.model("phamarcies", phamarcySchema)
export default phamarcyModel