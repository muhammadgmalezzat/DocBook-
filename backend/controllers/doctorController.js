import doctor from '../models/doctorModel.js'

const changeAvailability = async (req,res) => {
    try {
        const { docId } = req.body;
        const docData = await doctor.findById(docId);
        await doctor.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
    try {

        const doctors = await doctor.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export {changeAvailability,doctorList}