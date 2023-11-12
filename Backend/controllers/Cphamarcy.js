import phamarcyModel from "../models/Mphamarcy.js"

// =================================================//

const getAllPhamarcy = async (req, res) => {
    try {
        const Allphamarcy = await phamarcyModel.find()
        Allphamarcy.length !== 0 ? res.status(200).json({name:"phamarcy", value:Allphamarcy}) : res.status(404).json("no phamarcy found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ==========================================================//

const AddNewPhamarcy = async (req, res) => {
    const data = req.body
    const NewPhamarcy = new phamarcyModel(data)

    try {
        await NewPhamarcy.save()
        res.status(201).json(NewPhamarcy)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =========================================================//


const getPhamarcy = async (req, res) => {
    const { id } = req.params
    try {
        const phamarcy = await phamarcyModel.findById(id)
        phamarcy ? res.status(200).json(phamarcy) : res.status(404).json("Phamarcy not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =========================================================//


const updatePhamarcy = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const phamarcy = await phamarcyModel.findByIdAndUpdate(id, data, { new: true })
        phamarcy ? res.status(200).json(phamarcy) : res.status(404).json("Phamarcy not found")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// =========================================================//

const deletePhamarcy = async (req, res) => {
    const { id } = req.params
    try {
        await phamarcyModel.findByIdAndDelete(id)
        res.status(200).json('phamarcy deleted')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ======================================================//

const phamarcyAuth = async (req, res) => {
    const { email, password } = req.body
    try {
        const Phamarcy = await phamarcyModel.findOne({ email: email })
        if (Phamarcy) {
            Phamarcy.password === password ? res.status(200).json({ id: Phamarcy.id , firstName: Phamarcy.firstName, lastName: Phamarcy.lastName }) : res.status(401).json("Worng password")
        }
        else {
            res.status(404).json("Phamarcy does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllPhamarcy, AddNewPhamarcy, phamarcyAuth, getPhamarcy, updatePhamarcy, deletePhamarcy }