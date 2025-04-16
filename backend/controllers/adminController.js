import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding doctor

const addDoctor = async (req, res) => {
    console.log("add doctor func from admin controller ")
    try {
        console.log(req.body)
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // Process address
        let parsedAddress;
        try {
            parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
        } catch (error) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        let imageUrl = '';
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
                folder: 'doctor_profiles',
                resource_type: "auto"
            });
            imageUrl = imageUpload.secure_url;
        }

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees:Number(fees),
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Get All Doctors
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}





export { addDoctor,loginAdmin,allDoctors };