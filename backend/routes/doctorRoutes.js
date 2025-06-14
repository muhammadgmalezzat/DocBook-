import express from 'express';
import {
    doctorList,
    doctorLogin,
    getDoctorAppointments,
    appointmentComplete,
    appointmentCancel,
    // changeAvailablity,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
const doctorRouter = express.Router();

doctorRouter.post("/login", doctorLogin)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.get("/appointments", authDoctor, getDoctorAppointments)
doctorRouter.get("/list", doctorList)
// doctorRouter.post("/change-availability", authDoctor, changeAvailablity)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)

export default doctorRouter;