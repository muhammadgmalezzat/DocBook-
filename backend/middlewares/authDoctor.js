import jwt from "jsonwebtoken";

// Extract the JWT token from the request header.
// Verify it’s valid.
// Decode it to get the doctor ID.
// Attach the user ID to the request object for use in the controller.
// Protect routes that need authentication

// user authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = token_decode.id;
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor;