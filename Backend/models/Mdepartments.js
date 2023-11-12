import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
    {
        name: String,
        discription: String,
    },
    { timestamps: true }
)

const departmentModel = mongoose.model("departments", departmentSchema)
export default departmentModel