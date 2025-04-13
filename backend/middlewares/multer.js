import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

export default upload;


// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/doctors');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// const upLoad = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         if (['.jpg', '.jpeg', '.png'].includes(ext)) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images are allowed'));
//         }
//     }
// });

// export default upLoad;


















// import multer from 'multer';

// // Configure storage settings
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Specify upload directory
//     },
//     filename: function (req, file, cb) {
//         // Create unique filename with timestamp
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter to control accepted files
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
//     }
// };

// // Initialize multer with configuration
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024 // 5MB file size limit
//     },
//     fileFilter: fileFilter
// });

// export default upload;



