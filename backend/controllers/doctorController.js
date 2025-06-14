import doctor from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

//api to login doctor
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const docData = await doctor.findOne({ email });
        if (!docData) {
            return res.json({ success: false, message: 'Doctor Not Found' })
        }
        const isMatch =await bcrypt.compare(password, docData.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Password' })
        }
        const dtoken = jwt.sign({ id: docData._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ success: true, message: 'Login Success', docData , dtoken })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get all Appointments of doctor
const getDoctorAppointments = async (req, res) => { 
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId: docId }).sort({ createdAt: -1 });
        res.json({ success: true, appointments  })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

    // API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId });
        if (!appointments) {
            return res.json({ success: false, message: 'No Appointments Found' })
        }
        let completed = 0
        let cancelled = 0
        let pending = 0
        appointments.map((item) => {
            if (item.isCompleted) {
                completed += 1
            } else if (item.cancelled) {
                cancelled += 1
            } else {
                pending += 1
            }
        })
        let total = completed + cancelled + pending
        let completedPercentage = (completed / total) * 100;
        let cancelledPercentage = (cancelled / total) * 100;
        let pendingPercentage = (pending / total) * 100;


        let earnings = 0;

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse(),
            completed,
            cancelled,
            pending,
            completedPercentage,
            cancelledPercentage,
            pendingPercentage
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctor.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await doctor.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {
    changeAvailability,
    doctorList,
    doctorLogin,
    getDoctorAppointments,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile

}