import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId:
    {
        type: String,
        required: [true, 'user name is required']
    },
    docId:
    {
        type: String,
        required: [true, 'user name is required']
    },
    slotDate: {
        type: String,
        required: [true, 'user name is required']
    },
    slotTime: {
        type: String,
        required: [true, 'user name is required']
    },
    userData: {
        type: Object,
        required: [true, 'user name is required']
    },
    docData: {
        type: Object,
        required: [true, 'user name is required']
    },
    amount: {
        type: Number,
        required: [true, 'user name is required']
    },
    date: {
        type: Number,
        required: [true, 'user name is required']
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel