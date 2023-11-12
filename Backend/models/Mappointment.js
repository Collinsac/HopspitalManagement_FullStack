import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
    {
        patientId: String,
        doctorId: String,
        Status: String,
        Date:String,
        startTime: String,
        endTime: String,
        note: String,
    }, { timestamps: true }
)

const appointmentModel = mongoose.model("appointments", appointmentSchema)
export default appointmentModel