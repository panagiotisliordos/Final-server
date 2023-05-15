// config/cloudinary.config.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "user-gallery", // The name of the folder in cloudinary
        resource_type: "auto",
    },
});
const songStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "png", "mp3"], // Add the format(s) for song images, e.g., "mp3"
        folder: "song-gallery", // Change to a different folder name for song images
        resource_type: "auto",
    },
});
const userUpload = multer({ storage: storage });
const songUpload = multer({ storage: songStorage });

module.exports = {
    userUpload,
    songUpload,
};
//module.exports = multer({ storage });
