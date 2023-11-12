import mongoose from "mongoose";
const diseaseSchema = mongoose.Schema(
    {
        ReportId: String,
        Name: String,
        Causes: String,
        Status: String,
        prescription: String,
        prescripStatus: Boolean
    },
    { timestamps: true }
)

const diseasesModel = mongoose.model("diseases", diseaseSchema)
export default diseasesModel