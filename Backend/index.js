import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

// --------------------------------------------//
// -------------------------------------------//

import patientRoute from "./routes/Rpatients.js"
import doctorRoute from "./routes/Rdoctors.js"
import appointmentRoute from "./routes/Rappointment.js"
import reportRoute from "./routes/Rreport.js"
import diseasesRoute from "./routes/Rdiseases.js"
import notesRoute from "./routes/Rnotes.js"
import DepartmentRoute from "./routes/Rdepartments.js"
import AdminRoute from "./routes/Radmin.js"
import PhamarcyRoute from "./routes/Rphamarcy.js"

// ===================================================//

const app = express()

dotenv.config()
const PORT = process.env.PORT || 5000
const URL = process.env.DB_URL

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(app.listen(PORT, () => console.log(`Connected to database and App started on port: http://localhost:${PORT}`)))
    .catch((err) => console.log(err))


app.get('/', (req, res) => res.send("THE REST API Is Runing Properly"))

app.use('/patients', patientRoute)
app.use('/doctors', doctorRoute)
app.use('/appoints', appointmentRoute)
app.use('/reports', reportRoute)
app.use('/diseases', diseasesRoute)
app.use('/notes', notesRoute)
app.use('/departments', DepartmentRoute)
app.use('/admins', AdminRoute)
app.use('/phamarcies',PhamarcyRoute)
