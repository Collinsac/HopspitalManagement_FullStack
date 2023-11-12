import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
    {
        patientId: String,
        doctorId: String,
        condition:String
    },{timestamps: true}
)

const reportModel = mongoose.model("report", reportSchema)
export default reportModel