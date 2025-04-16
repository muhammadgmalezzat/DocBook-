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

export {changeAvailability}