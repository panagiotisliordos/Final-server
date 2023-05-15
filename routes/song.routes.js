const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Song = require("../models/Song.model");
const { songUpload } = require("../config/cloudinary.config");
// GET route to retrieve all songs
/*router.get("/songs", (req, res) => {
    Song.find()
        .then((songs) => {
            res.status(200).json(songs);
        })
        .catch((error) => {
            res.status(500).json({
                error: "Failed to retrieve songs from the database",
            });
        });
});*/
// POST route to upload an image to Cloudinary

router.post("/upload", songUpload.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No image file provided" });
        return;
    }

    const imageUrl = req.file.path;

    res.status(200).json({ imageUrl });
});
// POST route to add a new song
router.post("/songs", (req, res) => {
    const { title, artist, imageUrl, youtubeLink } = req.body;
    const newSong = new Song({
        title,
        artist,
        coverImage: imageUrl,
        youtubeLink,
    });

    newSong
        .save()
        .then((savedSong) => {
            res.status(201).json(savedSong);
        })
        .catch((error) => {
            res.status(500).json({
                error: "Failed to add the song to the database",
            });
        });
});
// GET route to retrieve all songs
router.get("/songs", (req, res) => {
    Song.find()
        .then((songs) => {
            res.status(200).json(songs);
        })
        .catch((error) => {
            res.status(500).json({
                error: "Failed to retrieve songs from the database",
            });
        });
});

// GET route to retrieve a specific song by id
router.get("/songs/:songId", (req, res) => {
    const { songId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(songId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Song.findById(songId)
        .then((song) => {
            if (!song) {
                res.status(404).json({ message: "Song not found" });
            } else {
                res.status(200).json(song);
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "Failed to retrieve the song from the database",
            });
        });
});

// PUT route to update a specific song by id
router.put("/songs/:songId", (req, res) => {
    const { songId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(songId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Song.findByIdAndUpdate(songId, req.body, { new: true })
        .then((updatedSong) => {
            if (!updatedSong) {
                res.status(404).json({ message: "Song not found" });
            } else {
                res.status(200).json(updatedSong);
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "Failed to update the song in the database",
            });
        });
});

// DELETE route to delete a specific song by id
router.delete("/songs/:songId", (req, res) => {
    const { songId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(songId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Song.findByIdAndRemove(songId)
        .then((deletedSong) => {
            if (!deletedSong) {
                res.status(404).json({ message: "Song not found" });
            } else {
                res.status(200).json({ message: "Song deleted successfully" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "Failed to delete the song from the database",
            });
        });
});

module.exports = router;
