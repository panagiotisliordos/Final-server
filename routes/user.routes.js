const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/user - Retrieves user information
router.get("/user/:id", isAuthenticated, (req, res, next) => {
    // Assuming you have the authenticated user's ID stored in req.user
    //const userId = req.user._id;
    //const userId = req.payload._id;
    const userId = req.params.id;
    console.log(userId);
    User.findById(userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            // Only include necessary user information
            const { _id, email, name, imageUrl } = user;
            console.log(user);
            res.status(200).json({ email, name, imageUrl, _id });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

module.exports = router;
