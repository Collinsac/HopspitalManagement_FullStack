import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
    {
        name: String,
        DOB: String,
        age: Number,
        address: String,
        phone: String,
        email: String,
        password:String,
        gender: String,

    },
    { timestamps: true }
)

const patientModel = mongoose.model("patients", patientSchema)
export default patientModel